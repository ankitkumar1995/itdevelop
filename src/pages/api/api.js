const API_URL = 'https://wordpress.missionstartupkarnataka.org/graphql/';
//const API_URL = 'http://13.233.140.189/graphql';
// import { gql, useQuery } from '@apollo/client';
import axios from 'axios';
import { BASE_URL } from './url';

export const getAllCalls = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/elevate-call/list`,
      {}
    );
    return response.data.data;
  } catch (error) {
    return error.response;
    // alert(JSON.stringify(...error?.response?.data));
  }
};
export const getAllGckCalls = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/gck-challenge/list`,
      {}
    );
    return response.data.data;
  } catch (error) {
    return error.response;
    // alert(JSON.stringify(...error?.response?.data));
  }
};
export const getProfileDetails = async ({ userId, userType, token }) => {
  try {
    const profileData = await axios.get(
      `${BASE_URL}/api/v1/${userType}/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return profileData.data;
  } catch (error) {
    return error.response;
  }
};
export const updateProfileDetails = async ({
  applicationId,
  userType,
  token,
  data,
}) => {
  try {
    const profileData = await axios.post(
      `${BASE_URL}/api/v1/${userType}/update/${applicationId}`,
      { ...data },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return profileData.data;
  } catch (error) {
    return error.response;
  }
};
async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getHomePage() {
  const data = await fetchAPI(
    `
      query HomePage {
        pageBy(pageId: 25) {
          commonBanner {
            title
            subTitle
            image {
              sourceUrl
            }
          }
          homePage {
            importantMessage{
              message
              urlText
            }
              bannerDropDown {
            type
            subType {
              subtypeandaction {
                label
                suggestedAction {
                  actionLabel {
                    title
                    url
                  }
                }
              }
            }
          }
            eventPopupImage{
              image{
                sourceUrl
              }
              pageUrl{
                title
                url
              }
            }
            externalLink {
              pageLink {
                title
                url
              }
            }
            mission {
              heading
              subHeading
              description
              button {
                title
                url
              }
              image {
                sourceUrl
              }
            }
            ourReach {
              heading
              subHeading
              businessInfo {
                title
                prefix
                count
                image {
                  sourceUrl
                }
                button{
                  title
                  url
                }
              }
              button {
                title
                url
              }
              image {
                sourceUrl
              }
            }
            ourStory {
              subTitle
              title
              image{
                sourceUrl
              }
              industryInfo {
                heading
                count
                icon {
                  sourceUrl
                }
              }
            }
            founderSpeak {
              heading
              subHeading
              content {
                title
                video
                description
                congratsText
                about
                image {
                  sourceUrl
                }
              }
            }
            socialFeeds {
              heading
              subHeading
              content {
                title
                subTitle
                description
                date
                socialLink
                image {
                  sourceUrl
                }
                
              }
            }
          }
        }
      }
      `
  );
  return data;
}
export async function getHomePageKN() {
  const data = await fetchAPI(
    `query HomePage {
        pageBy(pageId: 5398) {
          commonBanner {
            title
            subTitle
            image {
              sourceUrl
            }
          }
          homePage {
            importantMessage{
              message
              urlText
            }
              bannerDropDown {
            type
            subType {
              subtypeandaction {
                label
                suggestedAction {
                  actionLabel {
                    title
                    url
                  }
                }
              }
            }
          }
            eventPopupImage{
              image{
                sourceUrl
              }
              pageUrl{
                title
                url
              }
            }
            externalLink {
              pageLink {
                title
                url
              }
            }
            mission {
              heading
              subHeading
              description
              button {
                title
                url
              }
              image {
                sourceUrl
              }
            }
            ourReach {
              heading
              subHeading
              businessInfo {
                title
                prefix
                count
                image {
                  sourceUrl
                }
                button{
                  title
                  url
                }
              }
              button {
                title
                url
              }
              image {
                sourceUrl
              }
            }
            ourStory {
              subTitle
              title
              image{
                sourceUrl
              }
              industryInfo {
                heading
                count
                icon {
                  sourceUrl
                }
              }
            }
            founderSpeak {
              heading
              subHeading
              content {
                title
                video
                description
                congratsText
                about
                image {
                  sourceUrl
                }
              }
            }
            socialFeeds {
              heading
              subHeading
              content {
                title
                subTitle
                description
                date
                socialLink
                image {
                  sourceUrl
                }
                
              }
            }
          }
        }
      }
      `
  );
  return data;
}

export async function getVriddhiSchemeEvent() {
  const data = await fetchAPI(`query VriddhiSchemeQuery {
    page(id: "cG9zdDo2Mzkw") {
      commonBanner {
        title
        subTitle
        bannerButton {
          title
          url
        }
        image {
          sourceUrl
        }
      }
      vriddhiScheme {
        
        background {
          description
          fieldGroupName
          title
        }
        objectives {
          description
          title
        }
        structureOfVriddhiScheme {
          description
          title
        }
        eligibilityCrieteria {
          description
          title
        }
        challengeDetails {
          content {
            heading
            subHeading
            img {
              sourceUrl
            }
          }
          title
        }
        
      }
    }
  }
   `);
  return data;
}

export async function getVriddhiSchemeEventKN() {
  const data = await fetchAPI(`query VriddhiSchemeQuery {
    page(id: "cG9zdDo2Mzkw") {
      commonBanner {
        title
        subTitle
        bannerButton {
          title
          url
        }
        image {
          sourceUrl
        }
      }
      vriddhiScheme {
        
        background {
          description
          fieldGroupName
          title
        }
        objectives {
          description
          title
        }
        structureOfVriddhiScheme {
          description
          title
        }
        eligibilityCrieteria {
          description
          title
        }
        challengeDetails {
          content {
            heading
            subHeading
            img {
              sourceUrl
            }
          }
          title
        }
        
      }
    }
  }
   `);
  return data;
}

export async function getStatrtupGuidePage() {
  const data = await fetchAPI(
    `
   query MyQuery {
  page(id: "cG9zdDoyODc2") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
        mediaItemUrl
        children {
          nodes {
            id
            template {
              templateName
            }
          }
        }
      }
    }
    startupGuide {
      policyPdf {
        title
        pdf {
          mediaItemUrl
        }
        icon {
          sourceUrl
        }
      }
      operationalPdf {
        title
        pdf {
          mediaItemUrl
        }
        icon {
          sourceUrl
        }
      }
      boosterKit {
        title
        introTitle
        description
        button {
          title
          url
        }
        image {
          sourceUrl
        }
      }
      contactUs {
        title
        button {
          title
          url
        }
        image {
          sourceUrl
        }
        tollButton {
          button {
            title
            url
          }
          image {
            sourceUrl
          }
        }
      }
      faqs {
        introTitle
        title
        button {
          url
          title
        }
      }
      incorporate {
        title
        subTitle
        content {
          title
          description
          button {
            title
            url
          }
          image {
            sourceUrl
          }
        }
      }
      introduction {
        title
        subTitle
        introData {
          list
        }
        operationButton {
          title
          pdf {
            mediaItemUrl
          }
          icon {
            sourceUrl
          }
        }
        brandImage {
          sourceUrl
        }
        introImage {
          sourceUrl
        }
      }
      network {
        title
        subTitle
        content {
          title
          description
          button {
            title
            url
          }
          image {
            sourceUrl
          }
        }
      }
      program {
        title
        introTitle
        cardTitle
        cardSubtitle
        cardList {
          title
        }
        button {
          url
          title
        }
        cardImage {
          bottomImage {
            image1 {
              sourceUrl
            }
            image2 {
              sourceUrl
            }
          }
          topImage {
            sourceUrl
          }
        }
      }
      registerCompany {
        title
        subTitle
        registerButton {
          title
          url
        }
        policyButton {
          title
          pdf {
            mediaItemUrl
          }
          icon {
            sourceUrl
          }
        }
        image {
          sourceUrl
        }
        description
      }
      registrationProcess {
        title
        subTitle
        content {
          heading
          image {
            sourceUrl
          }
        }
      }
      upcomingEvents {
        title
        subTitle
        sliderContent {
          title
          description
          button {
            title
            url
          }
          eventImage {
            sourceUrl
          }
          linkGroup {
            link {
              title
              url
            }
            linkIcon {
              sourceUrl
            }
          }
        }
      }
    }
  }
  faqs(first: 10, where: {categoryId: 80}) {
    nodes {
      faqs {
        answer
        question
      }
    }
  }
}
    `
  );
  return data;
}

export async function getStatrtupGuidePageKN() {
  const data = await fetchAPI(
    `query MyQuery {
  page(id: "cG9zdDozMDEx") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
        mediaItemUrl
        children {
          nodes {
            id
            template {
              templateName
            }
          }
        }
      }
    }
    startupGuide {
      policyPdf {
        title
        pdf {
          mediaItemUrl
        }
        icon {
          sourceUrl
        }
      }
      operationalPdf {
        title
        pdf {
          mediaItemUrl
        }
        icon {
          sourceUrl
        }
      }
      boosterKit {
        title
        introTitle
        description
        button {
          title
          url
        }
        image {
          sourceUrl
        }
      }
      contactUs {
        title
        button {
          title
          url
        }
        image {
          sourceUrl
        }
        tollButton {
          button {
            title
            url
          }
          image {
            sourceUrl
          }
        }
      }
      faqs {
        button {
          url
          title
        }
      }
      incorporate {
        title
        subTitle
        content {
          title
          description
          button {
            title
            url
          }
          image {
            sourceUrl
          }
        }
      }
      introduction {
        title
        subTitle
        introData {
          list
        }
        operationButton {
          title
          pdf {
            mediaItemUrl
          }
          icon {
            sourceUrl
          }
        }
        brandImage {
          sourceUrl
        }
        introImage {
          sourceUrl
        }
      }
      network {
        title
        subTitle
        content {
          title
          description
          button {
            title
            url
          }
          image {
            sourceUrl
          }
        }
      }
      program {
        title
        introTitle
        cardTitle
        cardSubtitle
        cardList {
          title
        }
        button {
          url
          title
        }
        cardImage {
          bottomImage {
            image1 {
              sourceUrl
            }
            image2 {
              sourceUrl
            }
          }
          topImage {
            sourceUrl
          }
        }
      }
      registerCompany {
        title
        subTitle
        registerButton {
          title
          url
        }
        policyButton {
          title
          pdf {
            mediaItemUrl
          }
          icon {
            sourceUrl
          }
        }
        image {
          sourceUrl
        }
        description
      }
      registrationProcess {
        title
        subTitle
        content {
          heading
          image {
            sourceUrl
          }
        }
      }
      upcomingEvents {
        title
        subTitle
        sliderContent {
          title
          description
          button {
            title
            url
          }
          eventImage {
            sourceUrl
          }
          linkGroup {
            link {
              title
              url
            }
            linkIcon {
              sourceUrl
            }
          }
        }
      }
    }
  }
  faqs(first: 10, where: {categoryId: 80}) {
    nodes {
      faqs {
        answer
        question
      }
    }
  }
}
   
 
    `
  );
  return data;
}

export async function getIpCentrePage() {
  const data = await fetchAPI(
    `    query IpCentre {
  page(id: "cG9zdDoyNTM=") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
      bannerButton{
        url
        title
      }
    }
    
    ipCentre {
      contactDetailsHeading{
      contactTitle
      emailTitle
      websiteTitle
    }
      ipData {
        ipCenterContent
        emails {
          email
        }
        contactDetails
        image {
          sourceUrl
        }
        websites {
          website {
            title
            url
          }
        }
      }
    }
  }
}
          
          `
  );
  return data;
}
export async function getIpCentrePageKN() {
  const data = await fetchAPI(
    `query IpCentre {
  page(id: "cG9zdDo0ODk4") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
      bannerButton{
        url
        title
      }
    }
    ipCentre {
      contactDetailsHeading{
      contactTitle
      emailTitle
      websiteTitle
    }
      ipData {
        ipCenterContent
        emails {
          email
        }
        contactDetails
        image {
          sourceUrl
        }
        websites {
          website {
            title
            url
          }
        }
      }
    }
  }
}`
  );
  return data;
}
export async function getBoosterPage() {
  const data = await fetchAPI(
    `
      query BoosterPage {
        page(id: "cG9zdDoyMjk=") {
          commonBanner {
            title
            subTitle
            image {
              sourceUrl
            }
          }
          boosterKit {
            bannerPdf {
            btnTitle
              pdf {
                mediaItemUrl
              }
            }
            services {
              title
              subTitle
              description
              applyBoosterBtnUrl {
                url
                title
              }
              serviceBox {
                title
                topImage {
                  sourceUrl
                }
                bottomImage {
                  sourceUrl
                }
              }
            }
            partnerData {
              title
              description
              image {
                sourceUrl
              }
              button {
                title
                url
              }
            }
          }
        }
      }
      `
  );
  return data;
}
export async function getBoosterPageKN() {
  const data = await fetchAPI(
    `
      query BoosterPage {
        page(id: "cG9zdDo0ODgz") {
          commonBanner {
            title
            subTitle
            image {
              sourceUrl
            }
          }
          boosterKit {
            bannerPdf {
            btnTitle
              pdf {
                mediaItemUrl
              }
            }
            services {
              title
              subTitle
              description
              applyBoosterBtnUrl {
                url
                title
              }
              serviceBox {
                title
                topImage {
                  sourceUrl
                }
                bottomImage {
                  sourceUrl
                }
              }
            }
            partnerData {
              title
              description
              image {
                sourceUrl
              }
              button {
                title
                url
              }
            }
          }
        }
      }
      `
  );
  return data;
}
export async function getEventPage() {
  const data = await fetchAPI(`
  query Events {
    page(id: "cG9zdDo0MzA=") {
      commonBanner {
        title
        subTitle
        image {
          sourceUrl
        }
      }
      eventDetail {
        shareEvent {
          title
          description
          image {
            sourceUrl
          }
        }
        shareEventSocially {
          title
          socialIcon {
            icon {
              title
              url
            }
          }
        }
        speakers {
          title
          aboutSpeaker {
            name
            designation
            description
            image {
              sourceUrl
            }
          }
        }
        whatYouLearn {
          title
          leftList {
            icon {
              title
              url
            }
            learnText
          }
          rightList {
            icon {
              title
              url
            }
            learnText
          }
        }
        eventInfo {
          title
          image {
            sourceUrl
          }
          content {
            heading
            subHeading
            image {
              sourceUrl
            }
          }
        }
      }
    }
  }
  
    `);
  return data;
}
// export async function getMediaDetails() {
//   const data = await fetchAPI(`
//   query MediaEvent {
//     page(id: "cG9zdDo0ODA=") {
//       media {
//         heroTab {
//           title
//           ariaControl
//           ref
//         }
//         mediaEvent {
//           id
//           content {
//             description
//             currentDate
//             eventDate
//             button {
//               title
//               url
//             }
//           }
//         }
//         mediaNews {
//           id
//           content {
//             title
//             description
//             published
//             image {
//               sourceUrl
//             }
//             mediaImage {
//               sourceUrl
//             }
//           }
//         }
//       }
//     }
//   }

//   `);
//   return data;
// }

export async function getAboutusLeadershipPage() {
  const data = await fetchAPI(
    `
    query AboutusLeadership {
      page(id: "cG9zdDo1NjM=") {
        commonBanner {
          title
          subTitle
          image {
            sourceUrl
          }
        }
        aboutusLeadership {
          council {
            description
            subTitle
            title
          }    
          techSlider {
            description {
              image{
                sourceUrl
              }
            }
          }
          ourSuccessStories {
            title
            subTitle
            categories {
              label
            }
          }
        }
      }
    }`
  );
  return data;
}
export async function getAboutusLeadershipPageKN() {
  const data = await fetchAPI(
    `
    query AboutusLeadership {
      page(id: "cG9zdDo0ODc2") {
        commonBanner {
          title
          subTitle
          image {
            sourceUrl
          }
        }
        aboutusLeadership {
          council {
            description
            subTitle
            title
          }
          
          techSlider {
            description {
              image{
                sourceUrl
              }
            }
          }
          ourSuccessStories {
            title
            subTitle
            categories {
              label
            }
          }
        }
      }
    }`
  );
  return data;
}

export async function getAULeadershipPage() {
  const data = await fetchAPI(
    `
    query AULeadership {
      aULeaderships {
        nodes {
          auLeadership {
            category {
              name
              title
              image {
                sourceUrl
              }
            }
          }
          title
          id
          date
          categories {
            nodes {
              categoryId
              name
            }
          }
        }
      }
    }`
  );
  return data;
}
export async function getFaqs() {
  const data = await fetchAPI(`
  query MyQuery {
     page(id: "cG9zdDo0ODc=") {
       aboutusFaqs {
      categories {
        item
      }
    }
       commonBanner {
        title
        subTitle
        image {
          sourceUrl
        }
      }
     }
  faqs(first: 1000,where: {language: EN}) {
    nodes {
      faqs {
        question
        answer
      }
      categories(first: 1000) {
        nodes {
          categoryId
          name
        }
      }
    }
  }
}
`);
  return data;
}
export async function getFaqsKN() {
  const data = await fetchAPI(`
  query MyQuery {
     page(id: "cG9zdDo0ODc=") {
       aboutusFaqs {
      categories {
        item
      }
    }
       commonBanner {
        title
        subTitle
        image {
          sourceUrl
        }
      }
     }
  faqs(first: 1000,where: {language: KN}) {
    nodes {
      faqs {
        question
        answer
      }
      categories(first: 1000) {
        nodes {
          categoryId
          name
        }
      }
    }
  }
}
`);
  return data;
}
export async function getSuccessStoriesPage() {
  const data = await fetchAPI(
    `
    query MyQuery {
  page(id: "cG9zdDo2ODI=") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
    }
    aboutusSuccessStories {
      introduction {
        description
        subtitle
        title
        image {
          sourceUrl
        }
      }
      loading {
        desc
        logo {
          sourceUrl
        }
      }
      success {
        subtitle
        title
      }
    }
  }
}
        `
  );
  return data;
}
export async function getSuccessStoriesPageKN() {
  const data = await fetchAPI(
    `
    query MyQuery {
  page(id: "cG9zdDo0ODc5") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
    }
    aboutusSuccessStories {
      introduction {
        description
        subtitle
        title
        image {
          sourceUrl
        }
      }
      loading {
        desc
        logo {
          sourceUrl
        }
      }
      success {
        subtitle
        title
      }
    }
  }
}
        `
  );
  return data;
}
export async function getMoreSuccessStories(first, endCur) {
  const data = await fetchAPI(
    `query MyQuery($first:Int!,$after:String) {
      successStories(first:$first,after:$after,where: {language: EN}) {
    nodes {
      acf_successStories {
        companyImage {
          sourceUrl
        }
        companyName
        sector
        successContentList
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `,
    {
      variables: {
        first: first,
        after: endCur,
      },
    }
  );
  return data;
}
export async function getMoreSuccessStoriesKN(first, endCur) {
  const data = await fetchAPI(
    `query MyQuery($first:Int!,$after:String) {
      successStories(first:$first,after:$after,where: {language: KN}) {
    nodes {
      acf_successStories {
        companyImage {
          sourceUrl
        }
        companyName
        sector
        successContentList
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `,
    {
      variables: {
        first: first,
        after: endCur,
      },
    }
  );
  return data;
}

export async function getEduInstitutesPage() {
  const data = await fetchAPI(
    `query EduInstitutes {
  page(id: "cG9zdDo3OTM=") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
      bannerButton{
        url
        title
      }
    }
    eduInstitute {
      eduData {
        title
        aboutInstitute
        focusArea
        address
        image {
          sourceUrl
        }
        emails{
          email
        }
        button{
          title
          url
          target
        }
      }
    }
  }
}
`
  );
  return data;
}
export async function getEduInstitutesPageKN() {
  const data = await fetchAPI(
    `
    query EduInstitutes {
  page(id: "cG9zdDo0OTAz") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
      bannerButton{
        url
        title
      }
    }
    eduInstitute {
      eduData {
        title
        aboutInstitute
        focusArea
        address
        image {
          sourceUrl
        }
        emails{
          email
        }
        button{
          title
          url
          target
        }
      }
    }
  }
}`
  );
  return data;
}
export async function getInternationalPartnerPage() {
  const data = await fetchAPI(
    `
    query InterPartner {
  page(id: "cG9zdDo3ODM=") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
      bannerButton{
        title
        url
      }
    }
    internationalPartnerships {
      contactDetails{
        department
        emails
      }
      enquireText
      interPartner {
        description
        heading {
          title
          image {
            sourceUrl
          }
        }
        image {
          sourceUrl
        }
        readPdf {
          title
          pdf {
            mediaItemUrl
          }
        }
      }
    }
  }
}
    `
  );
  return data;
}
export async function getInternationalPartnerPageKN() {
  const data = await fetchAPI(
    `
    query InterPartner {
  page(id: "cG9zdDo1OTU1") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
      bannerButton{
        title
        url
      }
    }
    internationalPartnerships {
      contactDetails{
        department
        emails
      }
      enquireText
      interPartner {
        description
        heading {
          title
          image {
            sourceUrl
          }
        }
        image {
          sourceUrl
        }
        readPdf {
          title
          pdf {
            mediaItemUrl
          }
        }
      }
    }
  }
}
    `
  );
  return data;
}

export async function getReports() {
  const data = await fetchAPI(
    `
    query MyQuery {
      reports(first: 1000) {
        nodes {
          pdfLink {
            pdf {
              mediaItemUrl
            }
            desc
          }
          date
          id
          title
          categories {
            nodes {
              categoryId
              name
            }
          }
        }
      }
    }
    
        `
  );
  return data;
}

export async function getPolicies() {
  const data = await fetchAPI(
    `
    query MyQuery {
      policies(first: 100) {
        nodes {
          policy {
            pdf {
              mediaItemUrl
            }
          }
          title
          id
        }
      }
    }
    
        `
  );
  return data;
}

export async function getGovtOrders() {
  const data = await fetchAPI(
    `
    query MyQuery {
      governmentOrders(first: 100) {
        nodes {
          govtOrders {
            pdf {
              mediaItemUrl
            }
          }
          title
        }
      }
    }
    
        `
  );
  return data;
}

export async function getSchemes() {
  const data = await fetchAPI(
    `
    query MyQuery {
      schemes {
        nodes {
          scheme {
            pdf {
              mediaItemUrl
            }
          }
          title
          id
          date
          categories {
            nodes {
              categoryId
              name
            }
          }
        }
      }
    }
        `
  );
  return data;
}

export async function getIncentives() {
  const data = await fetchAPI(
    `
    query Incentives {
      page(id: "cG9zdDoyMDYx") {
        incentives {
          category {
            label
            content {
              title1
              desc1
              desc2
              desc3
              desc4
              desc5
              desc6
              desc7
              desc8
              title2
              title3
              title4
              title5
              title6
              title7
            title8
            title9
              list1 {
                text
              }
              list2 {
                text
              }
              list3 {
                text
              }
              list4 {
                text
              }
              pdf {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
    
        `
  );
  return data;
}

export async function getAboutus() {
  const data = await fetchAPI(
    `
    query Abouts {
      page(id: "cG9zdDo2MzU=") {
        commonBanner {
          title
          subTitle
          image {
            sourceUrl
          }
        }
        aboutUs {
          ourJourney {
            title
            subTitle
            description
            storyStats {
              title
              suffix
              subTitle
            }
          }
          dottedImage{
            sourceUrl
          }
          ourObjective {
            title
            subTitle
            birdLogo{
              sourceUrl
            }
            objectBox {
              title
              description
              button {
                url
                title
              }
              image {
                sourceUrl
              }
            }
          }
          keyActivities {
            title
            subTitle
            keyHighlights {
              keys
            }
            image {
              sourceUrl
            }
            button {
              title
              url
            }
          }
          ourStatistics {
            title
            subTitle
            content {
              title
              ytd
              mtd
              icon {
                sourceUrl
              }
              logo {
                sourceUrl
              }
            }
          }
          ourStrategies {
            title
            subTitle
            content {
              title
              image {
                sourceUrl
              }
            }
          }
        }
      }
    }
    `
  );
  return data;
}
export async function getAboutusKN() {
  const data = await fetchAPI(
    `
    query Abouts {
      page(id: "cG9zdDo0ODcz") {
        commonBanner {
          title
          subTitle
          image {
            sourceUrl
          }
        }
        aboutUs {
          ourJourney {
            title
            subTitle
            description
            storyStats {
              title
              suffix
              subTitle
            }
          }
          dottedImage{
            sourceUrl
          }
          ourObjective {
            title
            subTitle
            birdLogo{
              sourceUrl
            }
            objectBox {
              title
              description
              button {
                title
                url
              }
              image {
                sourceUrl
              }
            }
          }
          keyActivities {
            title
            subTitle
            keyHighlights {
              keys
            }
            image {
              sourceUrl
            }
            button {
              title
              url
            }
          }
          ourStatistics {
            title
            subTitle
            content {
              title
              ytd
              mtd
              icon {
                sourceUrl
              }
              logo {
                sourceUrl
              }
            }
          }
          ourStrategies {
            title
            subTitle
            content {
              title
              image {
                sourceUrl
              }
            }
          }
        }
      }
    }
    `
  );
  return data;
}
// export async function getAllAboutFAQ() {
//   const data = await fetchAPI(`
//   query MyQuery {
//     page(id: "cG9zdDo0ODc=") {
//      aboutusFaqs {
//       categories {
//         item
//       }
//     }
//       commonBanner {
//         title
//         subTitle
//         image {
//           sourceUrl
//         }
//       }
//     }
//   }

//   `);
//   return data;
// }

export async function getKstartupCell() {
  const data = await fetchAPI(`
  query StartupCell {
    page(id: "cG9zdDozMDE0") {
      commonBanner {
        title
        subTitle
        image {
          sourceUrl
        }
        bannerButton {
          title
        }
      }
      karnatakStartupCell {
        objective {
          toolContent {
            title
            subTitle
            description
          }
          objectContent {
            title
            subTitle
            description
            button {
              title
              url
            }
            image {
              sourceUrl
            }
          }
        }
        ourCommitment {
          title
          subTitle
          counterContent {
            title
            countData
            prefix
            postfix
            linBtn{
              url
              title
            }
            icon{
              sourceUrl
            }
          }
          image {
            sourceUrl
          }
          button {
            url
            title
          }
        }
        startupCellPanel {
          subtitle
          title
          startupKarnatakaCell {
            label
            content {
              description
              intro
              title
              contact {
                email
              }
            }
            content1 {
              intro
              box {
                leftTitle
                rightBox {
                  desc
                  email1
                  email2
                  title
                }
              }
            }
          }
          monitoringAndReviewCommittie {
            label
            title
            pdf {
              mediaItemUrl
            }
            content {
              pdfContent {
                title
                description
              }
            }
          }
          startupCouncil {
            label
            title
            pdf {
              mediaItemUrl
            }
            content {
              title
              description
            }
          }
        }
      }
    }
  } 
  `);
  return data;
}
// cG9zdDozNDUx
export async function getKstartupCellKN() {
  const data = await fetchAPI(`
  query StartupCell {
    page(id: "cG9zdDozODcw") {
      commonBanner {
        title
        subTitle
        image {
          sourceUrl
        }
        bannerButton {
          title
        }
      }
      karnatakStartupCell {
        objective {
          toolContent {
            title
            subTitle
            description
          }
          objectContent {
            title
            subTitle
            description
            button {
              url
              title
            }
            image {
              sourceUrl
            }
          }
        }
        ourCommitment {
          title
          subTitle
          counterContent {
            title
            countData
            prefix
            postfix
            linBtn{
              url
              title
            }
            icon{
              sourceUrl
            }
          }
          image {
            sourceUrl
          }
          button {
            url
            title
          }
        }
        startupCellPanel {
          subtitle
          title
          startupKarnatakaCell {
            label
            content {
              description
              intro
              title
              contact {
                email
              }
            }
            content1 {
              intro
              box {
                leftTitle
                rightBox {
                  desc
                  email1
                  email2
                  title
                }
              }
            }
          }
          monitoringAndReviewCommittie {
            label
            title
            pdf {
              mediaItemUrl
            }
            content {
              pdfContent {
                title
                description
              }
            }
          }
          startupCouncil {
            label
            title
            pdf {
              mediaItemUrl
            }
            content {
              title
              description
            }
          }
        }
      }
    }
  }
  `);
  return data;
}

export async function getAllEvents() {
  const data = await fetchAPI(`
  query MyQuery {
  events(first: 1000) {
    nodes {
      acf_events {
        currentDate
        eventDate
        eventType
        eventImage {
          sourceUrl
        }
        eventDescription
      }
      title
      slug
      id
    }
  }
}
  
  `);
  return data;
}
export async function getEventDetails(slug) {
  const data = await fetchAPI(
    `query MyQuery($id:ID!) {
        event(id: $id){
            acf_events {
              currentDate
              eventDate
              eventType
              eventImage {
                sourceUrl
              }
            }
        }
      }
  
  `,
    {
      variables: {
        id: slug,
      },
    }
  );
  return data;
}
export async function getAllNews() {
  const data = fetchAPI(`
  query News {
    newsItems(first: 100) {
    edges {
      node {
        title
        acf_news {
          publishedDate
          description
          readTime
          newsLink {
            title
            url
            target
          }
          channelIcon {
            sourceUrl
          }
          newsImage {
            sourceUrl
          }
        }
      }
    }
  }
  }  
  `);
  return data;
}

export async function getContactus() {
  const data = fetchAPI(`
  query Contactus {
    page(id: "cG9zdDo3NzQ=") {
      contactus {
        tollBar {
          subTitle
          title
          tollButton {
            contactNumber
            image {
              sourceUrl
            }
          }
        }
        officeLocations {
          location {
            description
            title
            googleMap {
              map {
                url
              }
              title
            }
            contact {
              contactNumber
              image {
                sourceUrl
              }
            }
          }
          subTitle
          title
        }
      }
    }
  }
  
  `);
  return data;
}
export async function getContactusKN() {
  const data = fetchAPI(`
  query Contactus {
    page(id: "cG9zdDozMTgx") {
      contactus {
        tollBar {
          subTitle
          title
          tollButton {
            contactNumber
            image {
              sourceUrl
            }
          }
        }
        officeLocations {
          location {
            description
            title
            googleMap {
              map {
                url
              }
              title
            }
            contact {
              contactNumber
              image {
                sourceUrl
              }
            }
          }
          subTitle
          title
        }
      }
    }
  }
  
  `);
  return data;
}

export async function getInnovationHubList() {
  const data = await fetchAPI(`
  query InnovationHub {
    page(id: "cG9zdDo5NTc=") {
      commonBanner{
        title
        subTitle
        image{
          sourceUrl
        }
      }
      innovationHub {
        innovationNav {
          title {
            title
            url
          }
        }
        newAgeInnovationNetworks {
          content
          nainObjective {
            cardTitle
            cardSubtitle
            cardList {
              item
            }
            cardImage {
              topImage {
                image1 {
                  sourceUrl
                }
                image2 {
                  sourceUrl
                }
              }
              bottomImage {
                sourceUrl
              }
            }
            cardButton {
              url
              title
            }
          }
        }
      }
    }
  }
  `);
  return data;
}
export async function getInnovationHubListKN() {
  const data = await fetchAPI(`
  query InnovationHub {
    page(id: "cG9zdDozNDg2") {
      commonBanner{
        title
        subTitle
        image{
          sourceUrl
        }
      }
      innovationHub {
        innovationNav {
          title {
            title
            url
          }
        }
        newAgeInnovationNetworks {
          content
          nainObjective {
            cardTitle
            cardSubtitle
            cardList {
              item
            }
            cardImage {
              topImage {
                image1 {
                  sourceUrl
                }
                image2 {
                  sourceUrl
                }
              }
              bottomImage {
                sourceUrl
              }
            }
            cardButton {
              url
              title
            }
          }
        }
      }
    }
  }
  `);
  return data;
}
export async function getAllDepartments() {
  const data = await fetchAPI(`
  query DepartmentPage {
      page(id: "cG9zdDozNDAx") {
        commonBanner {
          title
          subTitle
          bannerButton {
            title
            url
          }
          image {
            sourceUrl
          }
        }
      }
    departments(where: {language: EN}) {
      edges {
        node {
          language {
            locale
          }
          title
          content
          departments {
            departmentTitle
            departmentPdf {
              mediaItemUrl
            }
            image {
              sourceUrl
            }
            downloadIcon {
              sourceUrl
            }
          }
        }
      }
    }
  }  
  `);
  return data;
}
export async function getAllDepartmentsKN() {
  const data = await fetchAPI(`
  query DepartmentPage {
    page(id: "cG9zdDozNDAz") {
      commonBanner {
        title
        subTitle
        bannerButton {
          title
          url
        }
        image {
          sourceUrl
        }
      }
    }
    departments(where: {language: KN}) {
      edges {
        node {
          language {
            locale
          }
          title
          content
          departments {
            departmentTitle
            departmentPdf {
              mediaItemUrl
            }
            image {
              sourceUrl
            }
            downloadIcon {
              sourceUrl
            }
          }
        }
      }
    }
  }  
  `);
  return data;
}
export async function getPMA() {
  const data = await fetchAPI(`
  query MyQuery {
    page(id: "cG9zdDoxNTc4") {
      commonBanner {
        subTitle
        title
        image {
          sourceUrl
        }
      }
      pma {
        pmaGuideline {
        title
        pdf {
          mediaItemUrl
        }
      }
        description
        button {
          title
          btn {
            url
          }
          pdf {
            mediaItemUrl
          }
        }
        content {
          image {
            sourceUrl
          }
          list {
            text
          }
        }
      }
    }
  }
  `);
  return data;
}
export async function getPMAKN() {
  const data = await fetchAPI(`
  query MyQuery {
    page(id: "cG9zdDoyOTgx") {
      commonBanner {
        subTitle
        title
        image {
          sourceUrl
        }
      }
      pma {
        pmaGuideline {
        title
        pdf {
          mediaItemUrl
        }
      }
        description
        button {
          title
          btn {
            url
          }
          pdf {
            mediaItemUrl
          }
        }
        content {
          image {
            sourceUrl
          }
          list {
            text
          }
        }
      }
    }
  }
  `);
  return data;
}
export async function getFunding() {
  const data = await fetchAPI(`
  query FundingPage {
    page(id: "cG9zdDoxNjMy") {
      funding {
        accelarationProgram {
          title
          subTitle
          content {
            title
            icon {
              sourceUrl
            }
          }
        }
        checkPolicies {
          title
          subTitle
          description
          icon
          button {
            url
            title
          }
          image {
            sourceUrl
          }
        }
        startupFunding {
          title
          birdLogo{
            sourceUrl
          }
          content {
            accordTitle
            accordContent {
              information {
                title
                description
              }
              applyLink {
                url
                title
              }
              image {
                sourceUrl
              }
            }
          }
        }
      }
      commonBanner {
        title
        image {
          sourceUrl
        }
        subTitle
        bannerButton{
          title
          url
        }
      }
    }
  }
  
  `);
  return data;
}
export async function getFundingKN() {
  const data = await fetchAPI(`
  query FundingPage {
    page(id: "cG9zdDoyOTEw") {
      funding {
        accelarationProgram {
          title
          subTitle
          content {
            title
            icon {
              sourceUrl
            }
          }
        }
        checkPolicies {
          title
          subTitle
          description
          icon
          button {
            url
            title
          }
          image {
            sourceUrl
          }
        }
        startupFunding {
          title
          content {
            accordTitle
            accordContent {
              information {
                title
                description
              }
              applyLink {
                url
                title
              }
              image {
                sourceUrl
              }
            }
          }
        }
      }
      commonBanner {
        title
        image {
          sourceUrl
        }
        subTitle
        bannerButton{
          title
          url
        }
      }
    }
  }
  
  `);
  return data;
}
export async function getKTECHHUB() {
  const data = await fetchAPI(`
  query MyQuery {
    kTechHubs(first: 1000) {
      nodes {
        id
        kTech {
          cardTitle
          cardTitleKn
          cardDescription
          cardBtn {
            title
            url
          }
          cardBtnKn{
            url
            title
          }
          cardImage{
            sourceUrl
          }
          address
          contactPerson {
            title
            email {
              title
              url
            }
          }
          costOfIncubation {
            cost
            title
          }
          duration
          gallery {
            image {
              sourceUrl
            }
          }
          howToApply
          introSubTitle
          introTitle
          introduction
          sectorAndTechSupport {
            label {
              item
            }
            title
          }
          selectionCriteria {
            listItems {
              item
            }
            title
          }
          supportProvidedList {
            listItems {
              item
            }
            title
          }
          topLogo {
            image {
              sourceUrl
            }
          }
          website {
            webLink{
              title
              url
            }
          }
        }
      }
    }
  }
  
  
  `);
  return data;
}
export async function getCOE() {
  const data = fetchAPI(`
  query MyQuery {
    cOES(first: 1000) {
      nodes {
        id
        coe {
          cardTitle
          cardTitleKn
          cardDescription
          cardImage {
            sourceUrl
          }
          cardEmail
          introTitle
          introduction
          address
          duration
          howToApply
          website {
            webLink {
              title
              url
            }
          }
          sectorAndTechSupport {
            title
            label {
              item
            }
          }
          supportProvidedList {
            title
            listItems {
              item
            }
          }
          selectionCriteria {
            title
            listItems {
              item
            }
          }
          topLogo {
            image {
              sourceUrl
            }
          }
        }
      }
    }
  }
  
  `);
  return data;
}
export async function getPartnerCollege() {
  const data = await fetchAPI(`
  query MyQuery {
    partnerColleges(first: 1000){
      nodes {
        id
        categories {
          nodes {
            name
          }
        }
        partnerCollege {
          address
          collegeCity
          collegeName
          duration
          howToApply
          introSubTitle
          introTitle
          introduction
          website {
            webLink {
              title
              url
            }
          }
          collegeWebsite {
            title
            url
          }
          costOfIncubation {
            cost
            title
          }
          gallery {
            image {
              sourceUrl
            }
          }
          sectorAndTechSupport {
            title
            label {
              item
            }
          }
          selectionCriteria {
            title
            listItems {
              item
            }
          }
          supportProvidedList {
            title
            listItems {
              item
            }
          }
          tableBtn {
            title
            url
          }
          topLogo {
            image {
              sourceUrl
            }
          }
        }
      }
    }
  }
  
  
  `);
  return data;
}
export async function getTBI() {
  const data = await fetchAPI(`
  query MyTBI {
    tBIS(first: 1000) {
      nodes {
        id
        tbi {
          cardTitle
          cardTitleKn
          cardDescription
          cardImage {
            sourceUrl
          }
          cardBtn {
            title
            url
          }
          cardBtnKn{
            url
            title
          }
          introTitle
          introduction
          sectorAndTechSupport {
            title
            label {
              item
            }
          }
          address
        duration
        howToApply
        website {
          webLink {
            title
            url
          }
        }
          supportProvidedList {
            title
            listItems {
              item
            }
          }
          selectionCriteria {
            title
            listItems {
              item
            }
          }
          gallery {
            image {
              sourceUrl
            }
          }
          topLogo {
            image {
              sourceUrl
            }
          }
          costOfIncubation {
            title
            cost
          }
          costOfIncubationList {
            title
            listItems {
              item
            }
          }
        }
      }
    }
  }
  
  
  `);
  return data;
}
export async function getIncubateesList() {
  const data = await fetchAPI(`
  query IncubateList {
    incubatees(first: 1000) {
      nodes {
        incubateesDetail {
          cardTitle
          icon {
            sourceUrl
          }
        }
        categories{
          nodes {
            name
          }
        }
      }
    }
  }
  `);
  return data;
}
export async function getCif() {
  const data = await fetchAPI(`
  query MyQuery {
    cifs(first: 1000) {
      nodes {
        id
        cif {
          cardTitle
          cardTitleKn
          cardDescription
          cardButton {
            title
            url
          }
          cardButtonKn{
            url
            title
          }
          cardImage {
            sourceUrl
          }
          introTitle
          introduction
          sectorAndTechSupport {
            title
            label {
              item
            }
          }
          address
        howToApply
        duration
        website {
          webLink {
            title
            url
          }
        }
          supportProvidedList {
            title
            listItems {
              item
            }
          }
          selectionCriteria {
            title
            listItems {
              item
            }
          }
          topLogo {
            image {
              sourceUrl
            }
          }
          gallery {
            image {
              sourceUrl
            }
          }
          costOfIncubation {
            title
            cost
          }
        }
      }
    }
  }
   
  `);
  return data;
}
export async function getResource() {
  const data = await fetchAPI(`
  query Resource { 
    page(id: "cG9zdDo1MDE2") {
      commonBanner {
        image {
          sourceUrl
        }
        title
        subTitle
      }
    resourcePage {
      ourMaterials {
        title
        subTitle
        contentBox {
          title
          description
          buttonLink {
            applyBtn {
              url
              title
            }
            websiteBtn {
              url
              title
            }
            pdfBtn {
              title
              pdf {
                mediaItemUrl
              }
            }
          }
        }
      }
      disclaimer
      otherMaterial {
        title
        subTitle
        pdfLogo {
          sourceUrl
        }
        companyLogo {
          sourceUrl
        }
      }
    }
  }
    otherResourceItems {
      edges {
        node {
          otherResourceItem {
            name
            pdf {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
  
  `);
  return data;
}
export async function getResourceKn() {
  const data = await fetchAPI(`
  query MyQuery {
    page(id: "cG9zdDo1MDQ1") {
      commonBanner {
        image {
          sourceUrl
        }
        title
        subTitle
      }
    resourcePage {
      ourMaterials {
        title
        subTitle
        contentBox {
          title
          description
          buttonLink {
            applyBtn {
              url
              title
            }
            websiteBtn {
              url
              title
            }
            pdfBtn {
              title
              pdf {
                mediaItemUrl
              }
            }
          }
        }
      }
      disclaimer
      otherMaterial {
        title
        subTitle
        pdfLogo {
          sourceUrl
        }
        companyLogo {
          sourceUrl
        }
      }
    }
  }
    otherResourceItems {
      edges {
        node {
          otherResourceItem {
            name
            pdf {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
  `);
  return data;
}
export async function getNetworkPage() {
  const data = await fetchAPI(`
  query MyQuery {
    page(id: "cG9zdDozMDg2") {
      commonBanner {
        subTitle
        title
        image {
          sourceUrl
        }
      }
      network {
        mediaNav {
          key
          title
        }
        startupDetail {
          image {
            sourceUrl
          }
        }
        mentorDetail {
          image {
            sourceUrl
          }
          pdf {
            mediaItemUrl
          }
          pdfTitle
        }
        incubatorDetail {
          image {
            sourceUrl
          }
          pdf {
            mediaItemUrl
          }
          pdfTitle
        }
        investorDetail {
          image {
            sourceUrl
          }
        }
      }
    }
  }
  
  `);
  return data;
}
export async function getNetworkPageKN() {
  const data = await fetchAPI(`
  query MyQuery {
    page(id: "cG9zdDozMTYy") {
      commonBanner {
        subTitle
        title
        image {
          sourceUrl
        }
      }
      network {
        mediaNav {
          key
          title
        }
        startupDetail {
          image {
            sourceUrl
          }
        }
        mentorDetail {
          image {
            sourceUrl
          }
          pdf {
            mediaItemUrl
          }
          pdfTitle
        }
        incubatorDetail {
          image {
            sourceUrl
          }
          pdf {
            mediaItemUrl
          }
          pdfTitle
        }
        investorDetail {
          image {
            sourceUrl
          }
        }
      }
    }
  }
  
  `);
  return data;
}
export async function getPolicyPage() {
  const data = await fetchAPI(`
  query MyQuery {
    page(id: "cG9zdDozMDg0") {
      commonBanner {
        title
        subTitle
        image {
          sourceUrl
        }
      }
      governmentPolicy {
        policyNav {
          title {
            title
            url
          }
        }
      }
    }
  }
  
  `);
  return data;
}
export async function getPolicyPageKN() {
  const data = await fetchAPI(`
  query MyQuery {
    page(id: "cG9zdDozMDk5") {
      commonBanner {
        title
        subTitle
        image {
          sourceUrl
        }
      }
      governmentPolicy {
        policyNav {
          title {
            title
            url
          }
        }
      }
    }
  }
  
  `);
  return data;
}
export async function getElevate2021() {
  // const elevateId= await fetchAPI(``)
  const data = await fetchAPI(`
  query MyQuery {
    page(id: "cG9zdDo0MDQ4") {
      elevate2021 {
        button {
          pitch {
            mediaItemUrl
            title
          }
          apply {
            title
          }
        }
        challenge {
          challengeDesc
          challengeTitle
          image1 {
            sourceUrl
            title
          }
          rewards
          list {
            text
          }
          image2 {
            sourceUrl
            title
          }
          notice {
            subtitle
            text
            title
            list {
              text
            }
          }
        }
        challengeDetails {
          title
          button {
            title
          }
          content {
            heading
            subHeading
            img {
              sourceUrl
            }
          }
        }
        elegibility {
          list
          title
          heading
          subheading
        }
        pitch {
          heading
          title
          img {
            sourceUrl
          }
        }
        slider {
          title
          heading
          slider {
            card {
              subTitle
              text
              title
              button {
                title
              }
              item {
                sourceUrl
              }
            }
          }
        }
      }
      commonBanner {
        subTitle
        title
        bannerButton {
          title
        }
        secondButton {
          title
        }
        image {
          sourceUrl
        }
      }
    }
  }
    
  `);
  return data;
}
export async function getElevate2021Kn() {
  const data = await fetchAPI(`
  query MyQuery {
    page(id: "cG9zdDo0MTEy") {
      elevate2021 {
        button {
          pitch {
            mediaItemUrl
            title
          }
          apply {
            title
          }
        }
        challenge {
          challengeDesc
          challengeTitle
          image1 {
            sourceUrl
            title
          }
          rewards
          list {
            text
          }
          image2 {
            sourceUrl
            title
          }
          notice {
            subtitle
            text
            title
            list {
              text
            }
          }
        }
        challengeDetails {
          title
          button {
            title
          }
          content {
            heading
            subHeading
            img {
              sourceUrl
            }
          }
        }
        elegibility {
          list
          title
          heading
          subheading
        }
        pitch {
          heading
          title
          img {
            sourceUrl
          }
        }
        slider {
          title
          heading
          slider {
            card {
              subTitle
              text
              title
              button {
                title
              }
              item {
                sourceUrl
              }
            }
          }
        }
      }
      commonBanner {
        subTitle
        title
        bannerButton {
          title
        }
        secondButton {
          title
        }
        image {
          sourceUrl
        }
      }
    }
  }
      
  `);
  return data;
}
export async function getTermsConditions() {
  const data = await fetchAPI(`
  query MyQuery {
    page(id: "cG9zdDo0MDg1") {
      termsAndConditions {
        title
        subtitle
        button {
          title
        }
        content {
          text
          title
        }
      }
    }
  }
  
  `);
  return data;
}
export async function getTermsConditionsKN() {
  const data = await fetchAPI(`
  query MyQuery {
    page(id: "cG9zdDo2MjIy") {
      termsAndConditions {
        title
        subtitle
        button {
          title
        }
        content {
          text
          title
        }
      }
    }
  } 
  `);
  return data;
}
export async function getAmritEventDetail() {
  const data = await fetchAPI(
    `query MyQuery {
  page(id: "cG9zdDo0MTk5") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
      bannerButton {
        title
        url
      }
      secondButton {
        title
        url
      }
    }
    amrit {
      stepsToApply {
        label
        pdf {
            mediaItemUrl
        }
      }
      comingSoonBtn {
        title
        url
      }
      button {
        pitch {
          mediaItemUrl
          title
        }
        apply {
          title
          url
        }
      }
      challenge {
        challengeDesc
        challengeTitle
        image1 {
          sourceUrl
          title
        }
        image2 {
          sourceUrl
          title
        }
        rewards
        list {
          text
        }
        notice {
          title
          subtitle
          text
          list {
            text
          }
        }
      }
      challengeDetails {
        title
        button {
          title
        }
        content {
          heading
          subHeading
          img {
            sourceUrl
          }
        }
      }
      elegibility {
        list
        title
        heading
        subheading
      }
    }
  }
}
`
  );
  return data;
}
export async function getAmritEventDetailKN() {
  const data = await fetchAPI(
    `query MyQuery {
  page(id: "cG9zdDo0MjYz") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
      bannerButton {
        title
        url
      }
      secondButton {
        title
        url
      }
    }
    amrit {
      stepsToApply {
        label
        pdf {
            mediaItemUrl
        }
      }
      comingSoonBtn {
        title
        url
      }
      button {
        pitch {
          mediaItemUrl
          title
        }
        apply {
          title
          url
        }
      }
      challenge {
        challengeDesc
        challengeTitle
        image1 {
          sourceUrl
          title
        }
        image2 {
          sourceUrl
          title
        }
        rewards
        list {
          text
        }
        notice {
          title
          subtitle
          text
          list {
            text
          }
        }
      }
      challengeDetails {
        title
        button {
          title
        }
        content {
          heading
          subHeading
          img {
            sourceUrl
          }
        }
      }
      elegibility {
        list
        title
        heading
        subheading
      }
    }
  }
}
`
  );
  return data;
}
export async function getWomenEntrepreneur() {
  const data = await fetchAPI(`
  query MyQuery {
  page(id: "cG9zdDo0Mzc4") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
    }
    womenEnterpreneur {
      eligibilityCrieteria
      incentives
      mandatoryDocuments
      personalityQuote
    }
  }
}
`);
  return data;
}

export async function getWomenEntrepreneurKN() {
  const data = await fetchAPI(`
  query MyQuery {
  page(id: "cG9zdDo0ODU2") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
    }
    womenEnterpreneur {
      eligibilityCrieteria
      incentives
      mandatoryDocuments
      personalityQuote
    }
  }
}
`);
  return data;
}
export async function getGrandChallengeDetail() {
  const data = await fetchAPI(
    `query MyQuery {
  page(id: "cG9zdDo0NDM2") {
    grandChallenge {
      policyPdf {
        title
        pdf {
          mediaItemUrl
        }
        icon {
          sourceUrl
        }
      }
      operationalPdf {
            title
            pdf {
              mediaItemUrl
            }
            icon{
              sourceUrl
            }
          }
      termAndConditionPdf {
        mediaItemUrl
      }
      challenge {
        challengeTitle
        challengeDesc
        partnerDepartment {
          title
          content
          externalLink {
            title
            url
          }
        }
        gckFunding {
          title
          content
        }
        problemStatement {
          title
          content
          pdf {
            title
            pdf {
              mediaItemUrl
            }
          }
        }
        rewards
        list {
          text
        }
        notice {
          title
          text
          subtitle
          list {
            text
          }
        }
        image1 {
          sourceUrl
        }
      }
      button {
        apply {
          title
          url
        }
        pitch {
          mediaItemUrl
          title
        }
      }
      challengeDetails {
        title
        content {
          subHeading
          heading
          img {
            sourceUrl
          }
        }
        button {
          title
          url
        }
        image {
          sourceUrl
        }
      }
      elegibility {
        title
        subheading
        list
        heading
      }
      stepsToApply {
        label
        pdf {
          mediaItemUrl
        }
      }
    }
    commonBanner {
      title
      subTitle
      bannerButton {
        title
        url
      }
      secondButton {
        title
        url
      }
      image {
        sourceUrl
      }
    }
  }
}
`
  );
  return data;
}
export async function getGrandChallengeDetailKN() {
  const data = await fetchAPI(
    `query MyQuery {
  page(id: "cG9zdDo0NjI3") {
    grandChallenge {
      policyPdf {
        title
        pdf {
          mediaItemUrl
        }
        icon {
          sourceUrl
        }
      }
      operationalPdf {
            title
            pdf {
              mediaItemUrl
            }
            icon{
              sourceUrl
            }
          }
      challenge {
        challengeTitle
        challengeDesc
        partnerDepartment {
          title
          content
          externalLink {
            title
            url
          }
        }
        gckFunding {
          title
          content
        }
        problemStatement {
          title
          content
          pdf {
            title
            pdf {
              mediaItemUrl
            }
          }
        }
        rewards
        list {
          text
        }
        notice {
          title
          text
          subtitle
          list {
            text
          }
        }
        image1 {
          sourceUrl
        }
      }
      button {
        apply {
          title
          url
        }
        pitch {
          mediaItemUrl
          title
        }
      }
      challengeDetails {
        title
        content {
          subHeading
          heading
          img {
            sourceUrl
          }
        }
        button {
          title
          url
        }
        image {
          sourceUrl
        }
      }
      elegibility {
        title
        subheading
        list
        heading
      }
      stepsToApply {
        label
        pdf {
          mediaItemUrl
        }
      }
    }
    commonBanner {
      title
      subTitle
      bannerButton {
        title
        url
      }
      secondButton {
        title
        url
      }
      image {
        sourceUrl
      }
    }
  }
}
`
  );
  return data;
}
export async function getGalleries() {
  const data = await fetchAPI(
    `
    query MyQuery {
  page(id: "cG9zdDo0NDQz") {
    eventGalleries {
      eventGallery {
        id
        images {
          image {
            sourceUrl
          }
        }
        heading
        title
      }
      techSummitGallery {
        id
        images {
          image {
            sourceUrl
          }
        }
        heading
        title
      }
    }
  }
}
    `
  );
  return data;
}
export async function getGrassroot() {
  const data = await fetchAPI(
    `query MyQuery {
  page(id: "cG9zdDo0NzA1") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
      bannerButton {
        title
        url
      }
      secondButton {
        title
        url
      }
    }
    grassroot {
      bannerPdf {
        btnText
        pdf {
          mediaItemUrl
        }
      }
      grassrootIntroduction {
        title
        description
      }
      grassrootObjectives {
        title
        subTitle
        content {
          description
          image {
            sourceUrl
          }
        }
      }
    }
  }
}
    `
  );
  return data;
}
export async function getGrassrootKN() {
  const data = await fetchAPI(
    `query MyQuery {
  page(id: "cG9zdDo0ODcw") {
    commonBanner {
      title
      subTitle
      image {
        sourceUrl
      }
      bannerButton {
        title
        url
      }
      secondButton {
        title
        url
      }
    }
    grassroot {
      bannerPdf {
        btnText
        pdf {
          mediaItemUrl
        }
      }
      grassrootIntroduction {
        title
        description
      }
      grassrootObjectives {
        title
        subTitle
        content {
          description
          image {
            sourceUrl
          }
        }
      }
    }
  }
}
    `
  );
  return data;
}
export async function getOldEvents() {
  const data = await fetchAPI(
    `
    query MyQuery {
  posts(first: 1000,where: {language: EN}) {
    nodes {
      oldEvents {
         challengeDetails {
          logo {
            sourceUrl
          }
          title
          content {
            heading
            subHeading
            img {
              sourceUrl
            }
          }
        }
        aboutEvent
        selectionProcess
        winnerList {
          winnerName
          eventId
        }
      }
      title
      commonBanner {
        title
        subTitle
        image {
          sourceUrl
        }
      }
    }
  }
}
    `
  );
  return data;
}
export async function getOldEventsKN() {
  const data = await fetchAPI(
    `
    query MyQuery {
  posts(first: 1000,where: {language: KN}) {
    nodes {
      oldEvents {
         challengeDetails {
          logo {
            sourceUrl
          }
          title
          content {
            heading
            subHeading
            img {
              sourceUrl
            }
          }
        }
        aboutEvent
        selectionProcess
      }
      title
      commonBanner {
        title
        subTitle
        image {
          sourceUrl
        }
      }
    }
  }
}
    `
  );
  return data;
}
export async function getElevateWomenEvent() {
  const data = await fetchAPI(`
  query ElevateWomenQuery {
  page(id: "cG9zdDo1MjI2") {
    commonBanner {
      title
      subTitle
      bannerButton {
        title
        url
      }
      image {
        sourceUrl
      }
    }
    womenElevate {
      stepsToApply {
        label
        pdf {
          mediaItemUrl
        }
      }
      background {
        title
        description
      }
      objectives {
        title
        description
      }
      structureOfElevateWomen {
        title
        description
      }
      eligibilityCrieteria {
        title
        description
      }
      challengeDetails {
        content {
          heading
          subHeading
          img {
            sourceUrl
          }
        }
        logo {
          sourceUrl
        }
        title
      }
    }
  }
}
  `);
  return data;
}
export async function getElevateWomenEventKN() {
  const data = await fetchAPI(`
  query ElevateWomenQuery {
  page(id: "cG9zdDo1Mjgz") {
    commonBanner {
      title
      subTitle
      bannerButton {
        title
        url
      }
      image {
        sourceUrl
      }
    }
    womenElevate {
      stepsToApply {
        label
        pdf {
          mediaItemUrl
        }
      }
      background {
        title
        description
      }
      objectives {
        title
        description
      }
      structureOfElevateWomen {
        title
        description
      }
      eligibilityCrieteria {
        title
        description
      }
      challengeDetails {
        content {
          heading
          subHeading
          img {
            sourceUrl
          }
        }
        logo {
          sourceUrl
        }
        title
      }
    }
  }
}
  `);
  return data;
}
export async function getIncentiveForm() {
  const data = await fetchAPI(`query DepartmentPage {
  page(id: "cG9zdDo2MTk0") {
    incentivesForm {
      patentImage {
        sourceUrl
      }
      marketingImage {
        sourceUrl
      }
      gstImage {
        sourceUrl
      }
    }
  }
}`);
  return data;
}
