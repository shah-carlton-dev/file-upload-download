import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import ReactPlayer from 'react-player';
import {Col, Row, Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [preview, setPreview] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  const deleteFile = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setErrorMsg('');
    } catch(error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while deleting file. Try again later');
      } 
    }
  }

  return (
    <>
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="files-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
            <th>Delete File</th>
            <th>Preview Video</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() => {
                        downloadFile(_id, file_path, file_mimetype)
                      }
                      }
                    >
                      Download
                    </a>
                  </td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        deleteFile(_id)
                      }
                    >
                      Delete 
                    </a>
                  </td>
                  <td>
                    <a
                      href="#/"
                      onClick={() => {
                        setPreview(`${API_URL}/download/${_id}`)
                        setShowPreview(true);
                        handleShow();
                      }
                      }
                    >
                      Preview 
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      {/* {showPreview  ? (
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-6 mx-auto">
              <ReactPlayer url={preview} controls />
            </div>
          </div>
        </div>
      ) : (
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-6 mx-auto">
              preview displayed here
            </div>
          </div>
        </div>
      )} */}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col mx-auto">
              <ReactPlayer url={preview} controls />
            </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

  </>
  );
};

export default FilesList;