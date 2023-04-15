import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FieldArray, useField } from 'formik';
import Input from '../../ElevateFormControls/input';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1000px',
    marginTop: '10px',
  },
  button: {
    margin: theme.spacing(1),
  },
  field: {
    margin: theme.spacing(1),
  },
  text: {
    fontSize: '12px',
    color: '#9896ae',
    textDecoration: 'uppercase',
  },
  circlePlus: {
    display: 'flex',
    marginLeft: '20px',
    marginTop: '30px',
    alignItems: 'center',
    gap: '20px',
    color: '#1f3c88',
    letterSpacing: '0.5px',
    fontWeight: '600',
    width: '1100px',
  },
  addButton: {
    border: 'none',
    background: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    color: '#1f3c88',
  },
  closeBtn: {
    // border: '1px solid #ccc',
    background: 'none',
    border: 'none',
    color: '#ee6f57',
  },
  flexBtn: {
    width: '1009px',
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingTop: '10px',
  },
  marginGap: {
    marginBottom: '20px',
  },
}));
const Amenities = (props) => {
  const { name } = props;
  const classes = useStyles();
  const [field, meta] = useField(name);
  return (
    <div className={classes.container}>
      <FieldArray name={name}>
        {({ push, remove }) => (
          <div style={{ maxWidth: '1010px' }}>
            {field?.value?.map((p, index) => {
              const amenities = `registeration.amenitiesOrEvents.amenities[${index}]`;

              return (
                <>
                  <Box mt={3}>
                    <Input
                      placeholder="Enter name of the stakeholder here"
                      name={amenities}
                      label={`Amenities ${index + 1}`}
                      labelKN={`ಸೌಲಭ್ಯ ${index + 1}`}
                      required
                    />
                  </Box>

                  {index >= 3 && (
                    <>
                      <div className={classes.flexBtn}>
                        <button
                          className={classes.closeBtn}
                          type="button"
                          onClick={() => remove(index)}
                        >
                          <i class="fas fa-times-circle fa-2x"></i>
                        </button>
                      </div>
                    </>
                  )}
                </>
              );
            })}
            <div className={classes.circlePlus}>
              <button
                type="button"
                className={classes.addButton}
                onClick={() => push('')}
              >
                <i className="fas fa-plus-circle fa-3x"></i>
                <Typography
                  component="h1"
                  variant="h6"
                  style={{ color: '#1D293F' }}
                >
                  Add more amenities
                </Typography>
                <Typography
                  component="h5"
                  variant="h6"
                  style={{ color: '#1D293F' }}
                ></Typography>
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};
export default Amenities;
