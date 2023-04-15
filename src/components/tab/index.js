import { useState } from "react";

function TabsNav(props) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const tabData = [
    {
      title: "General",
      content: ""
    },
    {
      title: "Startups",
      content: ""
    },
    {
      title: "Investors",
      content: ""
    },
    {
      title: "Incubators",
      content: ""
    },
    {
      title: "Mentors",
      content: ""
    },
    {
      title: "Partners",
      content: ""
    },
    {
      title: "Institutes",
      content: ""
    }
  ]

  return (
    <>
        {tabData.map((item, index) => (
          <button
            className={toggleState === index + 1 ? "general-item general-link active-tabs" : "general-item general-link"}
            onClick={() => toggleTab(index + 1)}
          >
            <a>
            {item.title}
            </a>
          </button>
        ))
        }
        {props.children}
      

      {/*<div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Content 1</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            praesentium incidunt quia aspernatur quasi quidem facilis quo nihil
            vel voluptatum?
          </p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Content 2</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Content 3</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
            Accusamus in quia odit aspernatur provident et ad vel distinctio
            recusandae totam quidem repudiandae omnis veritatis nostrum
            laboriosam architecto optio rem, dignissimos voluptatum beatae
            aperiam voluptatem atque. Beatae rerum dolores sunt.
          </p>
        </div>
      </div>*/}
      </>
  );
}

export default TabsNav;




/*import React, { useState } from "react"
import { useEffect } from "react";

const Tab = ({children,active=0})=>{
    const [activeTab,setActiveTab] = useState(active);
    const [tabData,setTabData] = useState([]);
    useEffect(()=>{
        let data = [];
        React.Children.forEach(children,element=>{
            if(!React.isValidElement(element)) return;
            const {props:{tab,children}} = element;
            data.push({tab,children});
        })
        setTabData(data);
    },[children])
    return(
        <div className="w-100 fixed">
            <ul className="nav">
                {
                    tabData.map(({tab},idx)=>(
                        <li className="nav-item">
                            <a className={`nav-link ${idx === activeTab?"active":""}`} href="#" onClick={()=>setActiveTab(idx)}>
                                {tab}
                            </a>
                        </li>
                    ))
                }
            </ul>
            <div className="tab-content p-3">
                {tabData[active] && tabData[activeTab].children}

            </div>
        </div>
    )
}
const TabPane = ({children}) =>{
    return {children}
}
Tab.TabPane = TabPane;

export default Tab
/*
    <Tab>
        {tabContent.map((tab,idx)=>(
            <Tab.TabPane key={`Tab-${idx}`} tab={tab.title}>
                {tab.content}
            </Tab.TabPane>
        ))}
    </Tab>
*/