import React, {
  useState,
  useEffect,
  Fragment,
  useSyncExternalStore,
} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavbarMenu from "./NavbarMenu";
import ExportCSV from "./ExportCSV";
const BookStore = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState("");
  //New Form
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [language, setLanguage] = useState("");
  const [novel, setNovel] = useState(false);
  const [poetry, setPoetry] = useState(false);
  const [biography, setBiografy] = useState(false);
  const [isActive, setIsActive] = useState(0);
  const [page, setPage] = useState(0);
  const [publisher, setPublisher] = useState("");
  const [Isbn, setIsbn] = useState("s");
  const [selectedCategory, setSelectedCategory] = useState("");
  //Edit Form
  const [editId, setEditId] = useState("");
  const [editname, setEditName] = useState("");
  const [editauthor, setEditAuthor] = useState("");
  const [editreleaseDate, setEditReleaseDate] = useState(null);
  const [editlanguage, setEditLanguage] = useState("");
  const [editnovel, setEditNovel] = useState("");
  const [editpoetry, setEditPoetry] = useState(0);
  const [editbiography, setEditBiografy] = useState(0);
  const [editIsActive, setEditIsActive] = useState(0);
  const [editpage, setEditPage] = useState(0);
  const [editpublisher, setEditPublisher] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [data, setData] = useState([]);
  const [editselectedCategory, setEditSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const empdata = [
    {
      id: 1,
      name: "Manoj",
      author: 29,
      isActive: 1,
    },
    {
      id: 2,
      name: "virat",
      author: 30,
      isActive: 1,
    },
    {
      id: 3,
      name: "Rohit",
      author: 34,
      isActive: 0,
    },
  ];
  const handleEdit = (id) => {
    handleShow();
    axios.get(`https://localhost:7202/api/Book/${id}`).then((result) => {
      setEditAuthor(result.data.author);
      setEditName(result.data.bookName);
      // setEditReleaseDate(result.data.releaseDate);
      // setEditReleaseDate(formatDate(result.data.releaseDate));
      setEditReleaseDate(new Date(result.data.releaseDate));
      console.log("editrelease:", editreleaseDate);
      console.log("data:", result.data);
      console.log("release:", result.data.releaseDate);
      console.log("author:", editauthor);
      setEditIsbn(result.data.isbn);
      setEditLanguage(result.data.language);
      setEditNovel(result.data.novel);
      setEditPoetry(result.data.poetry);
      setEditPage(result.data.page);
      setEditBiografy(result.data.biography);
      setEditPublisher(result.data.publisher);
      setEditId(id);
    });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this book") == true) {
      axios
        .delete(`https://localhost:7202/api/Book/DeleteBook/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Book has been delete");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleSave = () => {
    const url = "https://localhost:7202/api/Book/AddBook";
    const data = {
      bookName: name,
      author: author,
      releaseDate: releaseDate,
      isbn: "isbn",
      language: language,
      novel: novel,
      poetry: poetry,
      biography: biography,
      page: page,
      publisher: publisher,
    };
    console.log("data", data);
    axios.post(url, data).then((result) => {
      getData();
      clear();
      toast.success("Book has been added");
    });
  };
  const clear = () => {
    setName("");
    setAuthor("");
    setReleaseDate("");
    setLanguage("");
    setNovel("");
    setPoetry(0);
    setBiografy(0);
    setEditName("");
    setEditAuthor("");
    setEditReleaseDate("");
    setEditLanguage("");
    setEditNovel(0);
    setEditPoetry(0);
    setEditBiografy(0);
    setEditId("");
    setSelectedCategory("");
  };
  const handleUpdate = () => {
    const url = `https://localhost:7202/api/Book/UpdateBook/${editId}`;
    const data = {
      id: editId,
      bookName: editname,
      author: editauthor,
      releaseDate: editreleaseDate,
      isbn: editIsbn,
      language: editlanguage,
      novel: editnovel,
      poetry: editpoetry,
      biography: editbiography,
      page: editpage,
      publisher: editpublisher,
    };
    console.log("data", data);
    axios.patch(url, data).then((result) => {
      handleClose();
      getData();
      clear();
      toast.success("Book has been updated");
    });
  };

  const getData = () => {
    axios
      .get("https://localhost:7202/api/Book/GetBook")
      .then((result) => {
        setData(result.data);
        // const releaseDateFromAPI = result.data[0].releaseDate;
        // const dataObject = new Date(releaseDateFromAPI);
        // setReleaseDate(dataObject);
        console.log(result.data);
        console.log("Setrelease", result.data.releaseDate);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [editreleaseDate]);

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
    setPoetry(selectedCategory === "poetry");
    setNovel(selectedCategory === "novel");
    setBiografy(selectedCategory === "biography");
  };
  const handleEditSelectChange = (event) => {
    setEditSelectedCategory(event.target.value);
    setEditPoetry(editselectedCategory === "poetry");
    setEditNovel(editselectedCategory === "novel");
    setEditBiografy(editselectedCategory === "biography");
  };
  const selectedCategoryValue = editnovel
    ? "novel"
    : editbiography
    ? "biography"
    : editpoetry
    ? "poetry"
    : "";
  const handleDateChange = (date) => {
    setReleaseDate(date);
  };
  // const handleEditDateChange = (date) => {
  //   setEditReleaseDate(date);
  // };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredData = data.filter((item) => {
    console.log("item", item);
    return (
      item.bookName.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.isbn.toLowerCase().includes(search.toLowerCase()) ||
      item.language.toLowerCase().includes(search.toLowerCase()) ||
      item.page.toString().includes(search) ||
      item.publisher.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <Fragment>
      <NavbarMenu />
      <ToastContainer />
      <Container fluid="md">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="m-5"
        />
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Col>
          <Col>
            <DatePicker
              selected={releaseDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
            />
          </Col>

          <Col>
            <Form.Select
              aria-label="Default select example"
              onChange={handleSelectChange}
              value={selectedCategory}
            >
              <option value="" disabled selected>
                Select a category
              </option>
              <option value="poetry">Poetry</option>
              <option value="novel">Novel</option>
              <option value="biography">Biography</option>
            </Form.Select>
          </Col>

          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Submit
            </button>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>ReleaseDate</th>
            <th>ISBN</th>
            <th>Language</th>
            <th>Page</th>
            <th>Publisher</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? filteredData.map((item, index) => {
                // const formatDate = (dateString) => {
                //   const date = new Date(dateString);
                //   const day = date.getDate();
                //   const month = date.getMonth() + 1;
                //   const year = date.getFullYear();
                //   return `${day}/${month}/${year}`;
                // };

                return (
                  <tr key={index}>
                    <td>{item.bookName}</td>
                    <td>{item.author}</td>
                    <td>{formatDate(item.releaseDate)}</td>
                    <td>{item.isbn}</td>
                    <td>{item.language}</td>
                    <td>{item.page}</td>
                    <td>{item.publisher}</td>

                    <td>
                      {item.novel && "Novel "}
                      {item.poetry && "Poetry"}
                      {item.biography && "Biography"}
                    </td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>
      <ExportCSV data={filteredData} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Label>Name:</Form.Label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Book Name"
                value={editname}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Authour:</Form.Label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter author"
                value={editauthor}
                onChange={(e) => setEditAuthor(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Language:</Form.Label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Language"
                value={editlanguage}
                onChange={(e) => setEditLanguage(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Publisher:</Form.Label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Publisher"
                value={editpublisher}
                onChange={(e) => setEditPublisher(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Isbn:</Form.Label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Isbn"
                value={editIsbn}
                onChange={(e) => setEditIsbn(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Page:</Form.Label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Page"
                value={editpage}
                onChange={(e) => setEditPage(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <DatePicker
                // selected={editreleaseDate}
                selected={new Date(editreleaseDate)}
                // onChange={handleEditDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
              /> */}
              <Form.Label>ReleaseDate:</Form.Label>
              <DatePicker
                selected={editreleaseDate}
                onChange={(date) => setEditReleaseDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
              />
            </Col>
            <Col>
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleEditSelectChange}
                // value={editselectedCategory}
                value={selectedCategoryValue}
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                <option value="poetry">Poetry</option>
                <option value="novel">Novel</option>
                <option value="biography">Biography</option>
              </Form.Select>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default BookStore;
