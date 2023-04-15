import React, { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { useField, useFormikContext } from 'formik';
import axios from 'axios';
import { BASE_URL } from '../../pages/api/url';
import { removeItem } from '../../utils/slugify';
import { toast, ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

let currentId = 0;

function getNewId() {
  return ++currentId;
}
const useStyles = makeStyles((theme) => ({
  stepperloader: {
    width: '100%',
    textAlign: 'center',
    left: '-2%',
    top: '40%',
    textAlign: 'center',
    position: 'absolute',
  },
  body: {
    background: '#f8f8fc',
  },
  label: {
    fontSize: '17px',
    color: '#1d293f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    textAlign: 'initial',
  },
  checkbox: {
    fontSize: '14px',
    fontWeight: '600',
    color: '1d293f',
    letterSpacing: '0.5px',
  },
  terms: {
    color: '#ee6f57',
  },
  pitchDownload: {
    fontSize: '16px',
    color: '#1d293f',
    letterSpacing: '0.5px',
    fontWeight: '600',
  },
  pitchDeck: {
    color: '#ee6f57',
  },
  image: {
    width: '30px',
    height: '30px',
    backgroundSize: '100% 100%',
  },
  required: {
    color: '#ee6f57',
  },
  previewList: {
    display: 'flex',
    position: 'relative',
    bottom: '110px',
    flexFlow: 'wrap',
    left: '22px',
    '& .previews': {
      marginLeft: '15px',
    },
    '& .removeSpan': {
      position: 'relative',
      bottom: '10px',
      cursor: 'pointer',
    },
  },
  attachment_link: {
    color: '#000 !important',
  },
}));

const FileList = ({
  files,
  classes,
  removeFile,
  type,
  uploadClass,
  introClass,
  loading,
}) => {
  return (
    <div
      className={`${classes.previewList} ${files?.length > 5 && introClass}`}
    >
      {files?.length > 0 &&
        files?.map((file, index) => {
          return (
            <div className={`previews ${uploadClass}`} key={index}>
              {file && file.url ? (
                file.url.toLowerCase().includes('.png') ||
                file.url.toLowerCase().includes('.jpg') ||
                file.url.toLowerCase().includes('.jpeg')
              ) : file.toLowerCase().includes('.png') ||
                file.toLowerCase().includes('.jpg') ||
                file.toLowerCase().includes('.jpeg') ? (
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    marginRight: '5px',
                  }}
                >
                  <img
                    src={file}
                    style={{
                      width: '120px',
                      height: '100px',
                    }}
                  />
                  <div
                    className="removeSpan"
                    onClick={() => removeFile(file)}
                    style={{
                      display: 'absolute',
                      top: '0',
                      right: '0',
                      marginTop: '-16px',
                      marginLeft: '-6px',
                    }}
                  >
                    <i className="fas fa-minus-circle"></i>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src="/assets/img/pdf.png"
                    style={{ width: '23px', marginRight: '5px' }}
                  />

                  <Link href={file}>
                    <a target="_blank" className={classes.attachment_link}>
                      {file && file.name
                        ? file.name.slice(0, 10) + '...'
                        : file.slice(0, 10) + '...'}
                    </a>
                  </Link>
                  <span className="removeSpan" onClick={() => removeFile(file)}>
                    <i className="fas fa-minus-circle"></i>
                  </span>
                </>
              )}
            </div>
          );
        })}
      <div className="px-3">
        {loading && <ClipLoader color="red" loading={loading} size={20} />}
      </div>
    </div>
  );
};
const UploadFiles = ({
  label,
  labelKN,
  name,
  url,
  size,
  fileSize,
  suportingDocuments,
  elevate,
  imageTypeMsg,
  showPreviewsInDropzone,
  typeMsg,
  introClass,
  uploadClass,
  filesLimit,
  acceptedFiles,
  required,
  notRequiredArray,
}) => {
  const [loading, setLoading] = useState(false);
  const [docType, setDocType] = useState('');
  const [field, meta] = useField(name);
  const ErrorText = meta.error ? meta.error : '';
  const [files, setFiles] = useState([]);
  const { setFieldValue } = useFormikContext();
  const classes = useStyles();
  const [filelist, setFilelist] = useState([...field.value]);
  /* success toast */
  const difToast = () => {
    toast.success('File uploaded Successfully', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const invalidToast = () => {
    toast.error('Maximum allowed number of file exceeded.Only 1 allowed', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  async function uploadFiles(formData) {
    const uploaded_files = await axios.post(
      `${BASE_URL}/api/v1/file/upload`,
      formData
    );
    return uploaded_files;
  }
  useEffect(() => {}, [files]);

  useEffect(() => {
    setFiles(field.value);
    if (notRequiredArray) {
      if (typeof field.value === 'string') {
        setFilelist([field.value]);
      } else {
        setFilelist([...field.value]);
      }
    } else {
      setFilelist(field.value);
    }
  }, [field.value]);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const removeFile = async (index) => {
    //debugger;
    const tempArray = removeItem(
      notRequiredArray ? [field.value] : [...field.value],
      index
    );
    await setFieldValue(name, tempArray);
    setFiles(tempArray);
    setFilelist(tempArray);
  };
  const onDrop = (accFiles, rejFiles) => {
    setLoading(true);
    if (filesLimit === filelist.length) {
      setLoading(false);
    }
    setDocType(accFiles?.map((typ) => typ?.type));
    if (filesLimit === 1 && filelist.length === 1) {
      invalidToast();
    } else {
      const formData3 = new FormData();
      accFiles.forEach((element) => {
        formData3.append('files', element);
      });
      (async function () {
        const files = await axios.post(
          `${BASE_URL}/api/v1/file/upload`,
          formData3
        );
        if (files) {
          setLoading(false);
          let file_list = filelist;
          if (Number(filesLimit) === 1) {
            setFilelist([...files.data.data]);
          } else {
            setFilelist([...filelist, ...files.data.data]);
          }
          const links = files.data.data.map((dt) => dt.url);

          if (field.value) {
            if (Number(filesLimit) === 1 && !notRequiredArray) {
              setFieldValue(name, [...links]);
            } else if (Number(filesLimit) > 1 && !notRequiredArray) {
              setFieldValue(name, [...field.value, ...links]);
            } else {
              setFieldValue(name, links[0]);
            }
          } else {
            if (Number(filesLimit) === 1 && notRequiredArray) {
              setFieldValue(name, links[0]);
            } else {
              setFieldValue(name, links);
            }
          }
        }
      })().then(() => {
        difToast();
      });
    }
  };

  const onUpload = (file, url) => {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }

        return fw;
      })
    );
  };
  const showPreviewsIcon = () => {};
  const handleDelete = (file) => {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  };

  // const handlePreviewIcon = (fileObject, classes) => {
  //   const { type } = fileObject.file;
  //   const iconProps = {
  //     className: classes.image,
  //   };

  //   switch (type) {
  //     case 'application/pdf':
  //       return (
  //         <div>
  //           <img
  //             src="/assets/img/pdf.png"
  //             style={{ width: '23px', marginRight: '5px' }}
  //           />
  //           {fileObject.file.name.slice(0, 10) + '...'}
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div>
  //           <img
  //             src="/assets/img/pdf.png"
  //             style={{ width: '23px', marginRight: '5px' }}
  //           />
  //           {fileObject.file.name.slice(0, 10) + '...'}
  //         </div>
  //       );
  //   }
  // };
  const handlePreviewIcon = (fileObject, classes) => {
    const { type } = fileObject.file;
    const iconProps = {
      className: classes.image,
    };

    switch (type) {
      case 'application/pdf':
        return (
          <div>
            <img
              src="/assets/img/pdf.png"
              style={{ width: '23px', marginRight: '5px' }}
            />
            {fileObject.file.name.slice(0, 10) + '...'}
          </div>
        );
      default:
        return (
          <div>
            <img
              src="/assets/img/pdf.png"
              style={{ width: '23px', marginRight: '5px' }}
            />
            {fileObject.file.name.slice(0, 10) + '...'}
          </div>
        );
    }
  };
  // const handleChange = (loadedFiles) => {

  // };

  return (
    <Fragment>
      <div className="dropzone-container">
        <>
          <h5>
            {label} {required && <span className={classes.required}>*</span>}
            <br />
            {labelKN}
          </h5>
        </>
        <DropzoneAreaBase
          fileObjects={files}
          onDrop={onDrop}
          onDelete={(file) => handleDelete(file)}
          onUpload={onUpload}
          onChange={(files) => console.log('Files: ', files)}
          maxFileSize={fileSize}
          dropzoneText={
            <>
              {typeMsg && (
                <span className={classes.label}>
                  <i className="fas fa-cloud-upload-alt fa-3x"></i> Drag and
                  drop your file here or browse <br />
                  {typeMsg} {size} MB
                </span>
              )}
              {elevate && (
                <span className={classes.label}>
                  <i className="fas fa-cloud-upload-alt fa-3x"></i> Drag and
                  drop your file here or browse <br /> PDF, Multiple uploads are
                  allowed with each file less than {size} MB
                </span>
              )}
              {imageTypeMsg && (
                <span className={classes.label}>
                  <i className="fas fa-cloud-upload-alt fa-3x"></i> Drag and
                  drop your file here or browse <br /> JPG or PNG, smaller than{' '}
                  {size} MB
                </span>
              )}
              {suportingDocuments && (
                <span className={classes.label}>
                  <i className="fas fa-cloud-upload-alt fa-3x"></i> Drag and
                  drop your file here or browse <br /> .ppt/.pdf, less than{' '}
                  {size} MB
                </span>
              )}
            </>
          }
          //showPreviews={true}
          showPreviewsInDropzone={false}
          open={true}
          dropzoneClass="dropzone-class"
          name={name}
          acceptedFiles={acceptedFiles}
          filesLimit={Number(filesLimit)}
          showAlerts={['error']}
          getDropRejectMessage={(rejectedFile, acceptedFile, maxFileSize) => {
            if (rejectedFile.size > maxFileSize) {
              return `File Size cannot exceed ${formatBytes(maxFileSize)}`;
            } else if (
              !acceptedFiles.includes(
                `.${
                  rejectedFile.name.split('.')[
                    rejectedFile.name.split('.').length - 1
                  ]
                }`
              )
            ) {
              return `File Type of .${
                rejectedFile.name.split('.')[
                  rejectedFile.name.split('.').length - 1
                ]
              } is not supported`;
            } else {
              return 'File is rejected due to some unknown error';
            }
          }}
        />
      </div>
      <ToastContainer />
      <FileList
        loading={loading}
        type={docType}
        files={filelist}
        classes={classes}
        introClass={introClass}
        uploadClass={uploadClass}
        removeFile={(index) => {
          removeFile(index);
        }}
      />
      <div className="upload-err" style={{ color: 'red', marginLeft: '22px' }}>
        {ErrorText}
      </div>
    </Fragment>
  );
};

export default UploadFiles;
