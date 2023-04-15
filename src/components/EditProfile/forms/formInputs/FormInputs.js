import React, { useEffect, useState } from 'react';
import { Field, useField } from 'formik';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import { fileUpload, formatBytes } from '../../helper/helper';
import { Eye, EyeOff, UploadCloud, X } from 'react-feather';
import { Select } from 'antd';
import ChipInput from 'material-ui-chip-input';
import moment from 'moment';

const DropzonePreview = ({ files, onRemove }) => {
  const handleRemove = (event, fileId) => {
    event.preventDefault();
    onRemove(fileId);
  };
  return (
    <div className="sk-form-file-input-previews">
      {files?.length > 0 &&
        files?.map((file, index) => (
          <div className="file-preview" key={`preview-${index}`}>
            <img src={file.url} alt="" />
            <button
              className="file-preview-remove"
              onClick={(e) => handleRemove(e, file.id)}
            >
              <X size={15} />
            </button>
          </div>
        ))}
    </div>
  );
};

const FormInput = ({
  type,
  id,
  label,
  iserror,
  placeholder,
  isTouched,
  chipData,
  options,
  conditionalRender,
  condition,
  acceptedFiles,
  filesLimit,
  maxFileSize,
  showPreviewsInDropzone,
  showAlerts,
  acceptedFilesExtensionsText,
  wordLimit,
  unlimitedWords,
  disabled,
  errorMessage,
  chipBtnClass,
  withRemoveBtn,
  onRemoveClick,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [field, fieldValue, { setValue }] = useField(id);
  const { Option } = Select;
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      if (filesLimit === 1) {
        setValue(uploadedFiles[0].url);
      } else {
        setValue(uploadedFiles.map((file) => file.url));
      }
    }
  }, [uploadedFiles]);

  useEffect(() => {
    if (type === 'file') {
      if (typeof field.value === 'string') {
        setUploadedFiles([{ id: Math.random(), url: field.value }]);
        return;
      }
      if (Array.isArray(field.value)) {
        setUploadedFiles(
          field.value.map((item, index) => ({ id: index, url: item }))
        );
        return;
      }
    }
  }, [type]);

  const handleFieldValue = (event, value) => {
    event.preventDefault();
    setValue(value);
  };

  const checkCondition = (baseFieldId, valueShouldBe) => {
    if (!(baseFieldId, valueShouldBe)) return '';
    const [field] = useField(baseFieldId);
    return field.value === valueShouldBe;
  };

  const handleFileDrop = async (droppedFile) => {
    if (droppedFile.length <= filesLimit - uploadedFiles.length) {
      const url = await fileUpload(droppedFile);
      if (url.status === 200) {
        setUploadedFiles([
          ...uploadedFiles,
          ...url.files.map((file, index) => ({
            ...file,
            id: uploadedFiles.length + index + 1,
          })),
        ]);

        toast.success('File uploaded Successfully', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } else {
      toast.error(
        `Maximum allowed number of file exceeded.Only ${filesLimit} allowed`,
        {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
    }
  };

  const handleDropRejectMessage = (rejectedFile, acceptedFile, maxFileSize) => {
    if (rejectedFile.size > maxFileSize) {
      return `File Size cannot exceed ${formatBytes(maxFileSize)}`;
    } else if (
      !acceptedFiles.includes(
        `.${
          rejectedFile?.name?.split('.')[
            rejectedFile?.name?.split('.')?.length - 1
          ]
        }`
      )
    ) {
      return `File Type of .${
        rejectedFile?.name?.split('.')[
          rejectedFile?.name?.split('.')?.length - 1
        ]
      } is not supported`;
    } else {
      return 'File is rejected due to some unknown error';
    }
  };

  const remainingCount = (value, separator, limit) => {
    let valueArr = value?.split(separator);
    return limit - valueArr?.length;
  };

  const onRemove = (id) => {
    const remainingFiles = uploadedFiles.filter((file) => file.id !== id);
    setValue('');
    setUploadedFiles([...remainingFiles]);
  };

  const handleTextAreaChange = (e) => {
    e.preventDefault();
    let valueArr = e?.target?.value?.split(' ');
    if (valueArr?.length < wordLimit + 1) {
      setValue(e?.target?.value);
    } else {
      setValue(field.value.trim());
    }
  };

  const handleMultiSelectChange = (e) => {
    setValue(e);
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    setValue(e?.target?.value);
  };

  const handleFieldValueMultiChip = (e, value) => {
    e.preventDefault();
    const currentValues = field.value;
    const isExist = currentValues.filter((item) => item === value).length > 0;
    isExist
      ? setValue([...currentValues.filter((item) => item !== value)])
      : setValue([...field.value, value]);
  };

  const isValueExistInArray = (value) => {
    const currentValues = field.value;
    return currentValues.filter((item) => item === value).length > 0;
  };

  const handleChipDelete = (value) => {
    const remainingValues = field.value.filter((item) => item !== value);
    setValue([...remainingValues]);
  };

  const handleChipAdd = (value) => {
    setValue([...field.value, value]);
  };

  switch (type) {
    case 'text':
      return (
        <div className="sk-form-input-container">
          <div className="sk-form-input">
            <label htmlFor={id} className="sk-form-input-label">
              {label}
              {withRemoveBtn && (
                <button onClick={onRemoveClick}>
                  <X size={13} />
                </button>
              )}
            </label>
            <Field
              id={id}
              name={id}
              placeholder={placeholder}
              disabled={disabled}
            />
          </div>
          {errorMessage && (
            <div className="sk-form-input-error">{errorMessage}</div>
          )}
          {iserror[id] && isTouched[id] && (
            <div className="sk-form-input-error">{iserror[id]}</div>
          )}
        </div>
      );
    case 'select':
      return !conditionalRender ? (
        <div className="sk-form-input-container">
          <div className="sk-form-input">
            <label htmlFor={id} className="sk-form-input-label">
              {label}
            </label>
            <Field id={id} name={id} as={'select'} disabled={disabled}>
              <option value="" disabled>
                Select One
              </option>
              {options?.map((option, index) => (
                <option key={`sk-form-select-${index}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
          </div>
          {iserror[id] && isTouched[id] && (
            <div className="sk-form-input-error">{iserror[id]}</div>
          )}
        </div>
      ) : (
        checkCondition(condition.baseFieldId, condition.valueShouldBe) && (
          <div className="sk-form-input-container">
            <div className="sk-form-input">
              <label htmlFor={id} className="sk-form-input-label">
                {label}
              </label>
              <Field id={id} name={id} as={'select'} disabled={disabled}>
                <option value="" disabled>
                  Select One
                </option>
                {options?.map((option, index) => (
                  <option key={`sk-form-select-${index}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>
            {iserror[id] && isTouched[id] && (
              <div className="sk-form-input-error">{iserror[id]}</div>
            )}
          </div>
        )
      );
    case 'chip':
      return (
        <div className="sk-form-input-container">
          <div className="sk-form-input">
            <label htmlFor={id} className="sk-form-input-label">
              {label}
            </label>
            <div className="sk-form-input-chip-button-container">
              {chipData
                ? chipData.map((chip, index) => (
                    <button
                      className={`sk-form-input-chip-button ${
                        field.value === chip.value ? 'selected' : ''
                      }`}
                      key={`sk-button-${index}`}
                      onClick={(e) => handleFieldValue(e, chip.value)}
                      disabled={disabled}
                    >
                      {chip.label}
                    </button>
                  ))
                : 'You need to pass a chipData to render the buttons'}
            </div>
          </div>
          {iserror[id] && isTouched[id] && (
            <div className="sk-form-input-error">{iserror[id]}</div>
          )}
        </div>
      );
    case 'file':
      return (
        <div className="sk-form-input-container">
          <div className="sk-form-input">
            <label htmlFor={id} className="sk-form-input-label">
              {label}
            </label>
            <DropzoneAreaBase
              dropzoneClass={`sk-form-file-input ${disabled ? 'disabled' : ''}`}
              acceptedFiles={acceptedFiles}
              filesLimit={filesLimit}
              maxFileSize={maxFileSize}
              showPreviewsInDropzone={showPreviewsInDropzone}
              showAlerts={showAlerts}
              onDrop={handleFileDrop}
              getDropRejectMessage={handleDropRejectMessage}
              dropzoneText={
                <div className="sk-file-input-text">
                  <div className="input-text-icon">
                    <UploadCloud size={30} />
                  </div>
                  <div className="input-text">
                    <p>
                      Drag and drop your file or <span>browse</span>
                    </p>
                    <p className="small-text">
                      {acceptedFilesExtensionsText ||
                        'JPG or PNG, smaller than 1 MB'}
                    </p>
                  </div>
                </div>
              }
              inputProps={{ disabled }}
            />
            <DropzonePreview files={uploadedFiles} onRemove={onRemove} />
            <ToastContainer />
          </div>
          {errorMessage && (
            <div className="sk-form-input-error">{errorMessage}</div>
          )}
          {iserror[id] && isTouched[id] && (
            <div className="sk-form-input-error">{iserror[id]}</div>
          )}
        </div>
      );
    case 'textarea':
      return (
        <div className="sk-form-input-container">
          <div className="sk-form-input">
            <label
              htmlFor={id}
              className={`sk-form-input-label ${
                !unlimitedWords ? 'd-flex justify-content-between' : ''
              }`}
            >
              {label}
              {!unlimitedWords && wordLimit && (
                <span className="word-count">
                  Words Left:
                  {field.value
                    ? remainingCount(field?.value?.toString(), ' ', wordLimit)
                    : wordLimit - 1}
                </span>
              )}
            </label>
            <textarea
              id={id}
              name={id}
              placeholder={placeholder}
              onChange={handleTextAreaChange}
              value={field.value}
              disabled={disabled}
            ></textarea>
          </div>
          {iserror[id] && isTouched[id] && (
            <div className="sk-form-input-error">{iserror[id]}</div>
          )}
        </div>
      );
    case 'date':
      return (
        <div className="sk-form-input-container">
          <div className="sk-form-input">
            <label htmlFor={id} className="sk-form-input-label">
              {label}
            </label>
            <input
              type="date"
              id={id}
              name={id}
              value={moment(field.value).format('YYYY-MM-DD')}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(e) => handleDateChange(e)}
            />
          </div>
          {iserror[id] && isTouched[id] && (
            <div className="sk-form-input-error">{iserror[id]}</div>
          )}
        </div>
      );
    case 'password':
      return (
        <div className="sk-form-input-container">
          <div className="sk-form-input">
            <label htmlFor={id} className="sk-form-input-label">
              {label}
            </label>
            <input
              type={!showPassword ? 'password' : 'text'}
              id={id}
              name={id}
              value={field.value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(e) => handleFieldValue(e, e.target.value)}
              className="sk-form-password-input"
            />
            <button
              className="toggle-password-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
            </button>
          </div>
          {errorMessage && (
            <div className="sk-form-input-error">{errorMessage}</div>
          )}
          {iserror[id] && isTouched[id] && (
            <div className="sk-form-input-error">{iserror[id]}</div>
          )}
        </div>
      );
    case 'multiSelect':
      return (
        <div className="sk-form-input-container">
          <div className="sk-form-input">
            <label htmlFor={id} className="sk-form-input-label">
              {label}
            </label>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder={placeholder}
              defaultValue={field.value}
              onChange={(e) => handleMultiSelectChange(e)}
              optionLabelProp="label"
              id={id}
              className="sk-form-multiselect"
              name={id}
              disabled={disabled}
            >
              {options.map((option, index) => (
                <Option
                  key={`${id}_Select_${index}`}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
          {iserror[id] && isTouched[id] && (
            <div className="sk-form-input-error">{iserror[id]}</div>
          )}
        </div>
      );
    case 'multiChip':
      return (
        <div className="sk-form-input-container">
          <div className="sk-form-input">
            <label htmlFor={id} className="sk-form-input-label">
              {label}
            </label>
            <div className="sk-form-input-chip-button-container">
              {chipData
                ? chipData.map((chip, index) => (
                    <button
                      className={`sk-form-input-chip-button ${chipBtnClass} ${
                        isValueExistInArray(chip) ? 'selected' : ''
                      }`}
                      key={`sk-button-${index}`}
                      onClick={(e) => handleFieldValueMultiChip(e, chip)}
                      disabled={disabled}
                    >
                      {chip}
                    </button>
                  ))
                : 'You need to pass a chipData to render the chip buttons'}
            </div>
          </div>
          {iserror[id] && isTouched[id] && (
            <div className="sk-form-input-error">{iserror[id]}</div>
          )}
        </div>
      );
    case 'multiChipWithUserType':
      return (
        <div className="sk-form-input-container">
          <div className="sk-form-input">
            <label htmlFor={id} className="sk-form-input-label">
              {label}
            </label>
            <div className="sk-form-input-chip-button-container">
              <ChipInput
                value={field.value}
                onAdd={(chip) => handleChipAdd(chip)}
                blurBehavior="add"
                disableUnderline={true}
                fullWidth={true}
                onDelete={(chip) => handleChipDelete(chip)}
                className="sk-form-input-chip-button-wrapper"
                InputProps={{ className: 'sk-form-input-chip-button-input' }}
                chipRenderer={({ value }, key) => (
                  <div className="sk-form-input-chip-button-override" key={key}>
                    {value}{' '}
                    <span
                      className="chip-delete"
                      onClick={(e) => {
                        e.preventDefault();
                        handleChipDelete(value);
                      }}
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="close"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                      </svg>
                    </span>
                  </div>
                )}
              />
            </div>
          </div>
          {iserror[id] && isTouched[id] && (
            <div className="sk-form-input-error">{iserror[id]}</div>
          )}
        </div>
      );
    default:
      return <input type={'text'} />;
  }
};

export default FormInput;
