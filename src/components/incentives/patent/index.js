import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../pages/api/url';
import CheckAndSuccessModal from '../../CheckAndSuccessModal';
import FormikStepperReg, { FormikStep } from '../../FormikStepperReg';
import DeclarationForm from './Declaration';
import FormA from './FormA';
import FormB from './FormB';
import FormC from './FormC';
import {
  declarationValidation,
  formAValidation,
  formBValidation,
  formCValidation,
} from './validation';
const dataId = { id: '' };
const PatentForm = (props) => {
  const [patentRes, setPatentRes] = useState('');
  const router = useRouter();
  const [apiId, setApiId] = useState('');
  const [checkbox, setCheckBox] = useState(false);
  const [show, setShow] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastStep, setLastStep] = useState(0);
  const [successModalData, setSuccessModalData] = useState(null);
  const [initialValues, setInitialValues] = useState({
    patentApplication: {
      reimbursementA: {
        companyName: '',
        kitsRegNo: '',
        incubDetails: {
          gokSupported: '',
          incubGokAffiliated: '',
          incubNameAddress: '',
          inventorName: '',
          inventorDesignation: '',
          patentOwner: '',
          patentTitle: '',
          totalReimbursementClaimed: '',
          pastFurnishClaimDetails: '',
        },
        patentDetails: {
          title: '',
          brief: '',
          adavantage: '',
          applicableSectors: '',
        },
      },
      reimbursementB: {
        filingDate: '',
        filingApplNo: '',
        inventionTitle: '',
        patentFiligCost: '',
        patentAppCopy: '',
      },
      postGrantReimbursement: {
        patentTitle: '',
        postReimbursementClaim: '',
        furnishDetails: '',
        patentERegNumber: '',
        patentGrantDate: '',
        form27: [],
        patentRegisterationCost: '',
        expensesStatement: [],
      },
      documents: {
        annexure1: [],
        annexure2: [],
        annexure3: [],
      },
    },
    status: 'Pending',
  });
  const getValue = (val) => {
    setCheckBox(val);
  };
  useEffect(() => {
    setLastStep(props?.stepCount);
    setInitialValues({
      patentApplication: {
        reimbursementA: {
          companyName:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.companyName) ||
            (props.patentRes &&
              props.patentRes.reimbursementA &&
              props.patentRes.reimbursementA.companyName) ||
            '',
          kitsRegNo:
            (props.registerData &&
              props.registerData.data &&
              props.registerData.data.certificate &&
              props.registerData.data.certificate.number) ||
            (props.patentRes &&
              props.patentRes.reimbursementA &&
              props.patentRes.reimbursementA.kitsRegNo) ||
            '',
          incubDetails: {
            gokSupported:
              props.patentRes &&
              props.patentRes.reimbursementA &&
              props.patentRes.reimbursementA.incubDetails &&
              props.patentRes.reimbursementA.incubDetails.gokSupported
                ? true
                : props.patentRes &&
                  props.patentRes.reimbursementA &&
                  props.patentRes.reimbursementA.incubDetails &&
                  !props.patentRes.reimbursementA.incubDetails.gokSupported
                ? false
                : '',
            incubGokAffiliated:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.incubDetails &&
                props.patentRes.reimbursementA.incubDetails
                  .incubGokAffiliated) ||
              '',
            incubNameAddress:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.incubDetails &&
                props.patentRes.reimbursementA.incubDetails.incubNameAddress) ||
              '',
            inventorName:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.incubDetails &&
                props.patentRes.reimbursementA.incubDetails.inventorName) ||
              '',
            inventorDesignation:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.incubDetails &&
                props.patentRes.reimbursementA.incubDetails
                  .inventorDesignation) ||
              '',
            patentOwner:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.incubDetails &&
                props.patentRes.reimbursementA.incubDetails.patentOwner) ||
              '',
            patentTitle:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.incubDetails &&
                props.patentRes.reimbursementA.incubDetails.patentTitle) ||
              '',
            totalReimbursementClaimed:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.incubDetails &&
                props.patentRes.reimbursementA.incubDetails
                  .totalReimbursementClaimed) ||
              '',
            pastFurnishClaimDetails:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.incubDetails &&
                props.patentRes.reimbursementA.incubDetails
                  .pastFurnishClaimDetails) ||
              '',
          },
          patentDetails: {
            title:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.patentDetails &&
                props.patentRes.reimbursementA.patentDetails.title) ||
              '',
            brief:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.patentDetails &&
                props.patentRes.reimbursementA.patentDetails.brief) ||
              '',
            adavantage:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.patentDetails &&
                props.patentRes.reimbursementA.patentDetails.adavantage) ||
              '',
            applicableSectors:
              (props.patentRes &&
                props.patentRes.reimbursementA &&
                props.patentRes.reimbursementA.patentDetails &&
                props.patentRes.reimbursementA.patentDetails
                  .applicableSectors) ||
              '',
          },
        },
        reimbursementB: {
          filingDate:
            (props.patentRes &&
              props.patentRes.reimbursementB &&
              props.patentRes.reimbursementB.filingDate) ||
            '',
          filingApplNo:
            (props.patentRes &&
              props.patentRes.reimbursementB &&
              props.patentRes.reimbursementB.filingApplNo) ||
            '',
          inventionTitle:
            (props.patentRes &&
              props.patentRes.reimbursementB &&
              props.patentRes.reimbursementB.inventionTitle) ||
            '',
          patentFiligCost:
            (props.patentRes &&
              props.patentRes.reimbursementB &&
              props.patentRes.reimbursementB.patentFiligCost) ||
            '',
          patentAppCopy:
            (props.patentRes &&
              props.patentRes.reimbursementB &&
              props.patentRes.reimbursementB.patentAppCopy) ||
            '',
        },
        postGrantReimbursement: {
          patentTitle:
            (props.patentRes &&
              props.patentRes.postGrantReimbursement &&
              props.patentRes.postGrantReimbursement.patentTitle) ||
            '',
          postReimbursementClaim:
            props.patentRes &&
            props.patentRes.postGrantReimbursement &&
            props.patentRes.postGrantReimbursement.postReimbursementClaim
              ? true
              : props.patentRes &&
                props.patentRes.postGrantReimbursement &&
                !props.patentRes.postGrantReimbursement.postReimbursementClaim
              ? false
              : '',
          furnishDetails:
            (props.patentRes &&
              props.patentRes.postGrantReimbursement &&
              props.patentRes.postGrantReimbursement.furnishDetails) ||
            '',
          patentERegNumber:
            (props.patentRes &&
              props.patentRes.postGrantReimbursement &&
              props.patentRes.postGrantReimbursement.patentERegNumber) ||
            '',
          patentGrantDate:
            (props.patentRes &&
              props.patentRes.postGrantReimbursement &&
              props.patentRes.postGrantReimbursement.patentGrantDate) ||
            '',
          form27:
            (props.patentRes &&
              props.patentRes.postGrantReimbursement &&
              props.patentRes.postGrantReimbursement.form27) ||
            [],
          patentRegisterationCost:
            (props.patentRes &&
              props.patentRes.postGrantReimbursement &&
              props.patentRes.postGrantReimbursement.patentRegisterationCost) ||
            '',
          expensesStatement:
            (props.patentRes &&
              props.patentRes.postGrantReimbursement &&
              props.patentRes.postGrantReimbursement.expensesStatement) ||
            [],
        },
        documents: {
          annexure1:
            (props.patentRes &&
              props.patentRes.documents &&
              props.patentRes.documents.annexure1) ||
            [],
          annexure2:
            (props.patentRes &&
              props.patentRes.documents &&
              props.patentRes.documents.annexure1) ||
            [],
          annexure3:
            (props.patentRes &&
              props.patentRes.documents &&
              props.patentRes.documents.annexure1) ||
            [],
        },
      },
    });
  }, [props]);
  return (
    <FormikStepperReg
      elevate
      formTopText="Patent Reimbursement"
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange
      incentive
      incentiveName={'Patent Incentives'}
      successModalData={successModalData}
      showSuccessModal={showSuccessModal}
      setShowSuccessModal={setShowSuccessModal}
      checkbox={checkbox}
      onSubmit={async (values, helpers, step, type) => {
        if (step === 0) {
          const res =
            props.updateId || apiId
              ? await axios
                  .post(
                    `${BASE_URL}/api/v1/startup/incentive/update/${
                      apiId !== '' ? apiId : props.updateId
                    }`,
                    {
                      'patentApplication.reimbursementA':
                        values.patentApplication.reimbursementA,
                      lastStep: step + 1,
                      userId: props.session.id,
                      applicationId: props.session.applicationId,
                      type: 'patent',
                    },
                    {
                      headers: {
                        Authorization: 'Bearer ' + props.session.accessToken,
                      },
                    }
                  )
                  .then((res) => {
                    if (res) {
                      dataId.id = res.data.data._id;
                      setApiId(res.data.data._id);
                      if (type === 'saveAndexit') {
                        router.push('/');
                      }
                      setLastStep(res.data.data.lastStep);
                    }
                  })
              : await axios
                  .post(
                    `${BASE_URL}/api/v1/startup/incentive/create/`,
                    {
                      'patentApplication.reimbursementA':
                        values.patentApplication.reimbursementA,
                      lastStep: step + 1,
                      userId: props.session.id,
                      applicationId: props.session.applicationId,
                      type: 'patent',
                    },
                    {
                      headers: {
                        Authorization: 'Bearer ' + props.session.accessToken,
                      },
                    }
                  )
                  .then((res) => {
                    if (res) {
                      dataId.id = res.data.data._id;
                      setApiId(res.data.data._id);
                      if (type === 'saveAndexit') {
                        router.push('/');
                      }
                      setLastStep(res.data.data.lastStep);
                    }
                  });
        }

        if (step === 1) {
          const res = await axios
            .post(
              `${BASE_URL}/api/v1/startup/incentive/update/${
                apiId !== '' ? apiId : props.updateId
              }`,
              {
                'patentApplication.reimbursementB':
                  values.patentApplication.reimbursementB,
                userId: props.session.id,
                applicationId: props.session.applicationId,
                type: 'patent',
                lastStep: step + 1,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + props.session.accessToken,
                },
              }
            )
            .then((res) => {
              if (res) {
                setApiId(res.data.data._id);
                if (type === 'saveAndexit') {
                  router.push('/');
                }
                setLastStep(res.data.data.lastStep);
              }
            });
        }
        if (step === 2) {
          const res = await axios
            .post(
              `${BASE_URL}/api/v1/startup/incentive/update/${
                apiId !== '' ? apiId : props.updateId
              }`,
              {
                'patentApplication.postGrantReimbursement':
                  values.patentApplication.postGrantReimbursement,
                userId: props.session.id,
                applicationId: props.session.applicationId,
                type: 'patent',
                lastStep: step + 1,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + props.session.accessToken,
                },
              }
            )
            .then((res) => {
              if (res) {
                if (type === 'saveAndexit') {
                  router.push('/');
                }
                setLastStep(res.data.data.lastStep);
              }
            });
        }
        if (step === 3) {
          if (checkbox) {
            const res = await axios
              .post(
                `${BASE_URL}/api/v1/startup/incentive/update/${
                  apiId !== '' ? apiId : props.updateId
                }`,
                {
                  'patentApplication.documents':
                    values.patentApplication.documents,
                  lastStep: step + 1,
                  userId: props.session.id,
                  applicationId: props.session.applicationId,
                  type: 'patent',
                  status: 'Pending',
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + props.session.accessToken,
                  },
                }
              )
              .then(async (res) => {
                if (res) {
                  setLastStep(res.data.data.lastStep);
                  await setSuccessModalData(res);
                  await setShowSuccessModal(true);
                }
              });
          } else {
            <CheckAndSuccessModal
              terms
              show={!checkbox}
              onClose={() => setShow(false)}
            />;
          }
        }
      }}
      lastStep={lastStep}
    >
      <FormikStep label="FormA" validationSchema={formAValidation}>
        <FormA />
      </FormikStep>
      <FormikStep label="FormB" validationSchema={formBValidation}>
        <FormB />
      </FormikStep>
      <FormikStep label="FormC" validationSchema={formCValidation}>
        <FormC />
      </FormikStep>
      <FormikStep label="Declaration" validationSchema={declarationValidation}>
        <DeclarationForm getValue={getValue} checkbox={checkbox} />
      </FormikStep>
    </FormikStepperReg>
  );
};
export default PatentForm;
