import { gql } from '@apollo/client';

export const FooterQuery = gql`
  query MyQuery {
    page(id: "cG9zdDo0OTE4") {
      pageLogoAndPdf {
        footerLogo {
          logo {
            sourceUrl
          }
          link {
            url
          }
        }
        headerMenuImages {
          fundingAndProgram {
            combatChallenge {
              label
              pdf {
                mediaItemUrl
              }
            }
          }
        }
        footer {
          label
          navItems {
            navLink {
              url
              title
            }
          }
        }
      }
    }
  }
`;

export const FooterQueryKN = gql`
  query MyQuery {
    page(id: "cG9zdDo2MDA1") {
      pageLogoAndPdf {
        footerLogo {
          logo {
            sourceUrl
          }
          link {
            url
          }
        }
        footer {
          label
          navItems {
            navLink {
              url
              title
            }
          }
        }
        headerMenuImages {
          fundingAndProgram {
            combatChallenge {
              label
              pdf {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;
export const HeaderQuery = gql`
  query MyQuery {
    page(id: "cG9zdDo0OTE4") {
      pageLogoAndPdf {
        header {
          label
          navItems {
            navLink {
              url
              title
            }
          }
        }
        megaMenu {
          label
          navItems {
            navItem {
              url
              title
            }
          }
        }
        headerLogo {
          logo {
            sourceUrl
          }
        }
        headerMenuImages {
          startupKit {
            text
            image {
              sourceUrl
            }
            downloadLink {
              text
              pdf {
                mediaItemUrl
              }
            }
          }
          fundingAndProgram {
            text
            image {
              sourceUrl
            }
            combatChallenge {
              label
              pdf {
                mediaItemUrl
              }
            }
            btnLink {
              title
              url
            }
          }
          network {
            text
            image {
              sourceUrl
            }
            btnLink {
              title
              url
            }
          }
          resources {
            text
            image {
              sourceUrl
            }
            btnLink {
              title
              url
            }
          }
        }
      }
    }
  }
`;
export const HeaderQueryKN = gql`
  query MyQuery {
    page(id: "cG9zdDo2MDA1") {
      pageLogoAndPdf {
        header {
          label
          navItems {
            navLink {
              url
              title
            }
          }
        }
        megaMenu {
          label
          navItems {
            navItem {
              url
              title
            }
          }
        }
        headerLogo {
          logo {
            sourceUrl
          }
        }
        headerMenuImages {
          startupKit {
            text
            image {
              sourceUrl
            }
            downloadLink {
              text
              pdf {
                mediaItemUrl
              }
            }
          }
          fundingAndProgram {
            text
            image {
              sourceUrl
            }
            combatChallenge {
              label
              pdf {
                mediaItemUrl
              }
            }
            btnLink {
              title
              url
            }
          }
          network {
            text
            image {
              sourceUrl
            }
            btnLink {
              title
              url
            }
          }
          resources {
            text
            image {
              sourceUrl
            }
            btnLink {
              title
              url
            }
          }
        }
      }
    }
  }
`;
export const MegaMenuQuery = gql`
  query MyQuery {
    menus(where: { id: 69 }) {
      nodes {
        menuItems(where: { parentId: "69" }) {
          nodes {
            label
            id
            childItems {
              edges {
                node {
                  label
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
