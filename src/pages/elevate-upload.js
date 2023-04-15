import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import { Formik, Form } from 'formik';

// const SimpleDropZone = () => {
//   const getUploadParams = ({ meta }) => {
//
//     return { url: 'https://httpbin.org/post' };
//   };

//   const handleChangeStatus = ({ meta, file }, status) => {
//
//   };

//   const handleSubmit = (files, allFiles) => {
//
//     allFiles.forEach((f) => f.remove());
//   };

//   const getFilesFromEvent = (e) => {
//     return new Promise((resolve) => {
//       getDroppedOrSelectedFiles(e).then((chosenFiles) => {
//         resolve(chosenFiles.map((f) => f.fileObject));
//       });
//     });
//   };

//   const InputChooseFile = ({ accept, onFiles, files, getFilesFromEvent }) => {
//     const title = `Drag and drop your files or browse
//                   PDF, smaller than 5 MB`;
//     const text = files.length > 0 ? 'Add' : `${title}`;

//     const buttonStyle = {
//       // backgroundColor: '#67b0ff',
//       // color: '#fff',
//       // cursor: 'pointer',
//       // padding: 15,
//       // borderRadius: 30,
//       cursor: 'pointer',
//     };

//     return (
//       <label style={buttonStyle}>
//         {text}
//         <input
//           style={{ display: 'none' }}
//           type="file"
//           accept={accept}
//           multiple
//           onChange={(e) => {
//             getFilesFromEvent(e).then((chosenFiles) => {
//               onFiles(chosenFiles);
//             });
//           }}
//         />
//       </label>
//     );
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="pitch-deck">
//           <Formik>
//             <div className="dropzone-container">
//               <i className="fas fa-cloud-upload-alt fa-2x"></i>
//               <Dropzone
//                 getUploadParams={getUploadParams}
//                 onChangeStatus={handleChangeStatus}
//                 // onSubmit={handleSubmit}
//                 InputComponent={InputChooseFile}
//                 getFilesFromEvent={getFilesFromEvent}
//                 classNames
//               />
//             </div>
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimpleDropZone;

// export const ElevateUpload = () => {
//   const [selectedFile, setSelectedFile] = useState();
//   const [preview, setPreview] = useState();

//   useEffect(() => {
//     if (!selectedFile) {
//       setPreview(undefined);
//       return;
//     }

//     const objectUrl = URL.createObjectURL(selectedFile);
//     setPreview(objectUrl);

//     return () => URL.revokeObjectURL(objectUrl);
//   }, [selectedFile]);

//   const onSelectFile = (e) => {
//     if (!e.target.files || e.target.files.length === 0) {
//       setSelectedFile(undefined);
//       return;
//     }

//     // I've kept this example simple by using the first image instead of multiple
//     setSelectedFile(e.target.files[0]);
//   };

//   return (
//     <div>
//       <input type="file" multiple onChange={onSelectFile} />
//       {selectedFile && <img src={preview} />}
//     </div>
//   );
// };

// export default ElevateUpload;

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButtons() {
  const classes = useStyles();
  const [files, setFile] = useState([]);
  const handlerFile = (e) => {
    let allfiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      allfiles.push(e.target.files[i]);
    }
    if (allfiles.length > 0) {
      setFile(allfiles);
    }
  };
  return (
    <div className={classes.root}>
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      {files.map((file, key) => {
        return (
          <div key={key}>
            <span className="Filename">
              {file.name}
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ width: '100px', height: 'auto' }}
              />
            </span>
          </div>
        );
      })}
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handlerFile}
      />
    </div>
  );
}
