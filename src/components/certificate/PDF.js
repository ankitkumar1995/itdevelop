import React from 'react';
import Head from 'next/head';
import {
  PDFViewer,
  Document,
  Page,
  Font,
  View,
  Image,
  Text,
} from '@react-pdf/renderer';
import moment from 'moment';

const PDF = ({ certificate }) => {
  // Fonts for the PDF
  Font.register({
    family: 'Manrope',
    fonts: [
      {
        src: 'https://cdn.jsdelivr.net/npm/manrope@2.0.0/complete/manrope-semibold.otf',
        fontWeight: 700,
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/manrope@2.0.0/complete/manrope-bold.otf',
        fontWeight: 'bold',
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/manrope@2.0.0/complete/manrope-medium.otf',
        fontWeight: 600,
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/manrope@2.0.0/complete/manrope-regular.otf',
        fontWeight: 500,
      },
    ],
  });
  Font.register({
    family: 'Baloo',
    src: 'https://fonts.gstatic.com/s/balootamma2/v2/vEFK2_hCAgcR46PaajtrYlBbd7wf8tK1W77HtMo.ttf',
  });
  Font.register({
    family: 'Noto Sans Kannada',
    src: 'https://fonts.gstatic.com/s/notosanskannada/v21/8vIs7xs32H97qzQKnzfeXycxXZyUmySvZWItmf1fe6TVmgop9ndpS-BqHEyGrDvNzSIMLsPKrkY.ttf',
  });
  return (
    <>
      <Head>
        <title>Registration Certificate</title>
      </Head>
      <PDFViewer
        style={{ width: '100%', height: '99.1vh', background: '#fff' }}
      >
        <Document title="Certificate">
          <Page
            size={'A4'}
            wrap
            style={{
              paddingVertical: '20px',
              paddingHorizontal: '20px',
              position: 'relative',
            }}
          >
            {/* Watermark */}
            <View style={{ position: 'absolute', top: '200px', width: '100%' }}>
              <Image
                style={{ width: '100%', height: '500px', opacity: '0.25' }}
                src={'/assets/img/startup-karnataka-logo.png'}
              ></Image>
            </View>
            {/* Watermark end */}
            <View
              style={{
                borderWidth: '1.5px',
                borderStyle: 'solid',
                borderColor: '#ee6f57',
                height: '100%',
                paddingVertical: '2px',
                paddingHorizontal: '2px',
              }}
            >
              <View
                style={{
                  borderWidth: '2.5px',
                  borderStyle: 'solid',
                  borderColor: '#ee6f57',
                  height: '100%',
                  paddingVertical: '2px',
                  paddingHorizontal: '2px',
                }}
              >
                <View
                  style={{
                    borderWidth: '1.5px',
                    borderStyle: 'solid',
                    borderColor: '#ee6f57',
                    height: '100%',
                    paddingVertical: '10px',
                    paddingHorizontal: '5px',
                  }}
                >
                  {/* Header Images*/}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}
                  >
                    <Image
                      style={{ width: '72px', height: '25px' }}
                      src={'/assets/img/Ik_logo.png'}
                    ></Image>
                    <Image
                      style={{ width: '60px', height: '60px' }}
                      src={'/assets/img/karnataka-govt.png'}
                    ></Image>
                    <Image
                      style={{ width: '70px', height: '35px' }}
                      src={'/assets/img/Ktech_logo.png'}
                    ></Image>
                  </View>

                  {/* Header Text */}
                  <Text
                    style={{
                      fontFamily: 'Noto Sans Kannada',
                      marginBottom: '0px',
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '18px',
                      color: '#E54825',
                    }}
                  >
                    ಕರ್ನಾಟಕ ಸರ್ಕಾರ
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Manrope',
                      marginBottom: '5px',
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '18px',
                      color: '#E54825',
                    }}
                  >
                    GOVERNMENT OF KARNATAKA
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Noto Sans Kannada',
                      marginBottom: '-4px',
                      width: '100%',
                      textAlign: 'center',
                      color: '#E54825',
                    }}
                  >
                    ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್, ಮಾಹಿತಿ ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಜೈವಿಕ ತಂತ್ರಜ್ಞಾನ
                    ನಿರ್ದೇಶನಾಲಯ {'     '}
                  </Text>
                  <View
                    style={{
                      fontFamily: 'Manrope',
                      marginBottom: '10px',
                      width: '100%',
                      textAlign: 'center',
                      color: '#E54825',
                      fontSize: '14px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Manrope',
                        width: '90%',
                        textAlign: 'center',
                        color: '#E54825',
                        fontSize: '14px',
                        marginTop: '5px',
                      }}
                    >
                      DIRECTORATE OF ELECTRONICS, INFORMATION TECHNOLOGY &
                      BIOTECHNOLOGY
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Noto Sans Kannada',
                      marginBottom: '5px',
                      width: '100%',
                      textAlign: 'center',
                      color: '#000000',
                    }}
                  >
                    ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರ {'     '}
                  </Text>
                  <View
                    style={{
                      fontFamily: 'Manrope',
                      marginBottom: '15px',
                      width: '100%',
                      textAlign: 'center',
                      color: '#E54825',
                      fontSize: '14px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Manrope',
                        width: '45%',
                        textAlign: 'center',
                        color: '#000000',
                        fontSize: '13px',
                        paddingVertical: '5px',
                        borderRadius: '10px',
                        borderStyle: 'dashed',
                        borderWidth: '1px',
                        borderColor: '#000000',
                      }}
                    >
                      REGISTRATION CERTIFICATE
                    </Text>
                  </View>
                  {/* Header Text end */}
                  {/* Main Body */}
                  <View
                    style={{
                      fontSize: '13px',
                      lineHeight: '1.7px',
                      textAlign: 'justify',
                      fontFamily: 'Manrope',
                      marginBottom: '10px',
                    }}
                  >
                    <Text style={{ fontFamily: 'Manrope' }}>
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: 'Noto Sans Kannada',
                        }}
                      >
                        ಮೆ||{' '}
                      </Text>
                      <Text
                        style={{
                          color: '#E54825',
                          fontFamily: 'Noto Sans Kannada',
                        }}
                      >
                        {certificate?.companyName}{' '}
                      </Text>
                      <Text style={{ fontFamily: 'Noto Sans Kannada' }}>
                        ಸಂಸ್ಥೆಯು
                      </Text>

                      <Text style={{ color: '#0B639A', fontFamily: 'Manrope' }}>
                        {' '}
                        {"'"}
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.registeredIncorporationAddress
                        }
                        ,
                        {certificate?.registeration?.companyFounderDetail?.city}
                        ,
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.state
                        }{' '}
                        -{' '}
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.pinCode
                        }
                        {"'"}{' '}
                      </Text>
                      <Text style={{ fontFamily: 'Noto Sans Kannada' }}>
                        ವಿಳಾಸದಲ್ಲಿ ನೋಂದಾಯಿತ ಕಛೇರಿಯನ್ನು ಹೊಂದಿದ್ದು
                      </Text>
                      <Text style={{ color: '#0B639A', fontFamily: 'Manrope' }}>
                        {' '}
                        {"'"}
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.registeredIncorporationAddress
                        }
                        ,
                        {certificate?.registeration?.companyFounderDetail?.city}
                        ,
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.state
                        }{' '}
                        -{' '}
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.pinCode
                        }
                        {"'"}{' '}
                      </Text>
                      <Text style={{ fontFamily: 'Noto Sans Kannada' }}>
                        ಸ್ಥಳದಲ್ಲಿರುವ ಘಟಕವನ್ನು
                      </Text>
                      <Text
                        style={{
                          color: '#E54825',
                          fontFamily: 'Noto Sans Kannada',
                        }}
                      >
                        {' '}
                        'ಸ್ಟಾರ್ಟ್‌ಅಪ್‌'{' '}
                      </Text>
                      <Text style={{ fontFamily: 'Noto Sans Kannada' }}>
                        ಎಂದು ಕರ್ನಾಟಕ ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ ಪಾಲಿಸಿಯನ್ವಯ
                        ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದ್ದು, ಈ ಕೆಳಕಂಡಂತೆ ನೋಂದಣಿ ಸಂಖ್ಯೆಯನ್ನು
                        ನೀಡಲಾಗಿದೆ. {'     '}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      fontSize: '13px',
                      lineHeight: '1.7px',
                      textAlign: 'justify',
                      fontFamily: 'Manrope',
                      marginBottom: '20px',
                    }}
                  >
                    <Text style={{ fontFamily: 'Manrope' }}>
                      <Text style={{ color: '#E54825', fontFamily: 'Manrope' }}>
                        {certificate?.companyName}{' '}
                      </Text>
                      having its Registered Office at the address:
                      <Text style={{ color: '#0B639A', fontFamily: 'Manrope' }}>
                        {' '}
                        {"'"}
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.registeredIncorporationAddress
                        }
                        ,
                        {certificate?.registeration?.companyFounderDetail?.city}
                        ,
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.state
                        }{' '}
                        -{' '}
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.pinCode
                        }
                        {"'"}
                        {'  '}
                      </Text>
                      is registered as a
                      <Text style={{ color: '#E54825', fontFamily: 'Manrope' }}>
                        {' '}
                        ‘Startup’{' '}
                      </Text>
                      with the
                      <Text style={{ color: '#E54825', fontFamily: 'Manrope' }}>
                        {' '}
                        ‘Karnataka Startup Cell’{' '}
                      </Text>
                      for the unit located at the
                      <Text style={{ color: '#0B639A', fontFamily: 'Manrope' }}>
                        {' '}
                        {"'"}
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.registeredIncorporationAddress
                        }
                        ,
                        {certificate?.registeration?.companyFounderDetail?.city}
                        ,
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.state
                        }{' '}
                        -{' '}
                        {
                          certificate?.registeration?.companyFounderDetail
                            ?.pinCode
                        }
                        {"'"}{' '}
                      </Text>
                      and has been allotted the Registration Number as given
                      hereunder:
                    </Text>
                  </View>
                  {/* Main Body End */}
                  {/* Validity */}
                  <View style={{ marginBottom: '15px' }}>
                    <Text
                      style={{
                        fontSize: '12px',
                        marginBottom: '5px',
                        color: '#E54825',
                        fontFamily: 'Manrope',
                      }}
                    >
                      The certificate shall only be valid for the entity:
                    </Text>
                    <Text style={{ fontSize: '12px', fontFamily: 'Manrope' }}>
                      * Up to 10 years from the date of its
                      incorporation/registration of the Company.
                    </Text>
                  </View>
                  {/* Validity End */}
                  {/* Registration Number */}
                  <View style={{ marginBottom: '15px' }}>
                    <Text
                      style={{
                        fontSize: '12px',
                        marginBottom: '5px',
                        color: '#0B639A',
                        fontFamily: 'Noto Sans Kannada',
                      }}
                    >
                      ಸಂಖ್ಯೆ: ಕಿಟ್ಸ್/ಎಸ್ ಕೆ-ನೋಂದಣಿ/
                      {certificate?.certificate?.number?.substr(13)}
                    </Text>
                    <Text
                      style={{
                        fontSize: '12px',
                        marginBottom: '5px',
                        color: '#0B639A',
                        fontFamily: 'Manrope',
                      }}
                    >
                      No: {certificate?.certificate?.number}
                    </Text>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: '#0B639A',
                        fontFamily: 'Manrope',
                      }}
                    >
                      Incorporation Date:{' '}
                      <Text style={{ color: '#E54825' }}>
                        {moment(certificate?.dateOfIncorporation).format(
                          'DD-MM-YYYY'
                        )}
                      </Text>
                    </Text>
                  </View>
                  {/* Registration Number End */}
                  {/* Footer */}
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View
                      style={{
                        width: '30%',
                        fontSize: '12px',
                        fontFamily: 'Manrope',
                      }}
                    >
                      <Text
                        style={{ fontFamily: 'Manrope', marginBottom: '5px' }}
                      >
                        <Text style={{ fontFamily: 'Noto Sans Kannada' }}>
                          ದಿನಾಂಕ
                        </Text>
                        /Date:{' '}
                        {moment(
                          certificate?.certificate?.date?.split('T')?.[0]
                        ).format('DD-MM-YYYY')}
                      </Text>
                      <Text style={{ fontFamily: 'Noto Sans Kannada' }}>
                        ಸ್ಥಳ: ಬೆಂಗಳೂರು
                      </Text>
                      <Text style={{ fontFamily: 'Manrope' }}>
                        Place: Bengaluru
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '70%',
                        fontSize: '12px',
                        fontFamily: 'Manrope',
                        textAlign: 'center',
                        position: 'relative',
                      }}
                    >
                      <Image
                        style={{
                          width: '110px',
                          height: '55px',
                          left: '40%',
                          top: '-90%',
                          position: 'absolute',
                        }}
                        src={'/assets/img/sign.png'}
                      ></Image>
                      <Text style={{ fontFamily: 'Noto Sans Kannada' }}>
                        ಸಿಸ್ಟಮ್ ವಿಶ್ಲೇಷಕ (ಡಿಇಐಟಿ) ಮತ್ತು ಪ್ರಧಾನ ವ್ಯವಸ್ಥಾಪಕರು
                        (ಐಟಿ) ಕಿಟ್ಸ್ {'      '}
                      </Text>
                      <Text style={{ fontFamily: 'Manrope' }}>
                        System Analyst (DEIT) & General Manager (IT) KITS
                      </Text>
                      <Text style={{ fontFamily: 'Noto Sans Kannada' }}>
                        ಬಿಎಂಟಿಸಿ ಕಟ್ಟಡ, 'ಬಿ'ಬ್ಲಾಕ್, 4ನೇ ಮಹಡಿ, ಕೆ.ಎಚ್ ರಸ್ತೆ,
                        ಬೆಂಗಳೂರು-560027{' '}
                      </Text>
                      <Text style={{ fontFamily: 'Manrope' }}>
                        BMTC Building, ‘B’Block,4th Floor, K.H
                        Road,Bengaluru-560027
                      </Text>
                    </View>
                  </View>
                  {/* Footer End */}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default PDF;
