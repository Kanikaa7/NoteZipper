import React, { useEffect,useState } from 'react';
import axios from 'axios';
import MainScreen from '../../Component/MainScreen'
import { Button, Card, Form } from 'react-bootstrap'
import ErrorMsg from '../../Component/ErrorMsg'
import Loading from '../../Component/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNoteAction, updateNoteAction } from '../../actions/noteActions'
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkDown from 'react-markdown';

const EditNote = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const {loading, error} = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = noteDelete;

  const deleteHandler = (id) => {
      if (window.confirm("Are you sure?")) {
        dispatch(deleteNoteAction(id));
      }
      navigate('/MyNotes');
  };

    useEffect(() => {
        const fetching = async () => {
            const {data} = await axios.get(`/api/notes/${id}`);

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        };

        fetching();
    }, [id, date]);

    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    };

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateNoteAction(id, title, content, category));
        if(!title || !content || !category) return;

        resetHandler();
        navigate("/MyNotes");
    };
  return (
    <MainScreen title="Edit Note">
        <Card>
            <Card.Header>Edit your Note</Card.Header>
            <Card.Body>
                <Form onSubmit={updateHandler}>
                {errorDelete && <ErrorMsg variant='danger' >{errorDelete}</ErrorMsg>}
                {loadingDelete && <Loading />}
                    {error && <ErrorMsg variant='danger' >{error}</ErrorMsg>}
                    <Form.Group className='mb-3' controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="title" value={title} placeholder="Enter the title" onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='content'>
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" value={content} placeholder="Enter the content" rows={4} onChange={(e) => setContent(e.target.value)} />
                    </Form.Group>

                    {content && (
                        <Card>
                            <Card.Header>Note Preview</Card.Header>
                            <Card.Body>
                                <ReactMarkDown>{content}</ReactMarkDown>
                            </Card.Body>
                        </Card>
                    )}

                    <Form.Group className='mb-3' controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='content' value={category} placeholder="Enter the category" onChange={(e) => setCategory(e.target.value)} />
                    </Form.Group>
                    {loading && <Loading size={50} />}
                    <Button type="submit" variant="primary" >Update Note</Button>
                    <Button className='mx-2' variant='danger' onClick={() => deleteHandler(id)} >Delete Note</Button>
                </Form>
            </Card.Body>

            <Card.Footer className='text-muted'>
                Updated on - {date.substring(0, 10)}
            </Card.Footer>
        </Card>
    </MainScreen>
  );
}

export default EditNote;