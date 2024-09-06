import MainScreen from '../../Component/MainScreen'
import { Link, useNavigate } from 'react-router-dom'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/noteActions';
import { useEffect } from 'react';
import Loading from '../../Component/Loading';
import ErrorMsg from '../../Component/ErrorMsg';

const MyNotes = ({search}) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);

  const {loading, notes, error} = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const {success: successCreate} = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const {success: successUpdate} = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = noteDelete;

  const deleteHandler = (id) => {
      if (window.confirm("Are you sure?")) {
        dispatch(deleteNoteAction(id));
      }
      navigate('/MyNotes');
  };

  const navigate = useNavigate();

    useEffect(() => {
      console.log(search);
        dispatch(listNotes());
        if(!userInfo) {
          navigate("/");
        }
    }, [userInfo,navigate,dispatch,successCreate, successUpdate, successDelete]);

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}...`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {errorDelete && <ErrorMsg variant='danger' >{errorDelete}</ErrorMsg>}
      {loadingDelete && <Loading />}
      {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
      {loading && <Loading />}
      {notes?.reverse().filter((filteredNote) => (
        filteredNote.title.toLowerCase().includes(search.toLowerCase())
      )).map((note) => (
        <Accordion key={note._id} defaultActiveKey={["0"]}>
          <Accordion.Item eventkey="0">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Button as={Card.Text} variant="link">
                    {note.title}
                  </Accordion.Button>
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse>
                <Card.Body>
                  <h4>
                    <Badge bg="success" text="light">
                      Category - {note.category}{" "}
                    </Badge>
                  </h4>

                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>


  )
}

export default MyNotes