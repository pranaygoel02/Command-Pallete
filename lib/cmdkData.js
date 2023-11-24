import { SlGrid } from "react-icons/sl";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineGroup } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import { MdOutlineLink } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaCircleInfo } from "react-icons/fa6";
import { BsFillCartFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { FaBlog } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";


export const ICON_MAP = {
  "SlGrid": <SlGrid />,
  "FaPlus": <FaPlus />,
  "MdOutlineGroup": <MdOutlineGroup />,
  "IoMdDocument": <IoMdDocument />,
  "MdOutlineLink": <MdOutlineLink />,
  "GoHomeFill": <GoHomeFill />,
  "FaCircleInfo": <FaCircleInfo />,
  "BsFillCartFill": <BsFillCartFill />,
  "IoMdMail": <IoMdMail />,
  "FaBlog": <FaBlog />,
  "FaQuestion": <FaQuestion />,
  "RiServiceFill": <RiServiceFill />,
  "IoMdSettings": <IoMdSettings />,
  "TbTargetArrow": <TbTargetArrow />
}

// mocking API call
async function getProjects () {
  const projetcs = [
    {
      title: "Project 1",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/project/1"
    },
    {
      title: "Project 2",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/project/2"
    },
    {
      title: "Project 3",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/project/3"
    },
    {
      title: "Project 4",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/project/4"
    },
    {
      title: "Project 5",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/project/5"
    },
    {
      title: "Project 6",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/project/6"
    },
    {
      title: "Project 7",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/project/7"
    },
    {
      title: "Project 8",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/project/8"
    },
    {
      title: "Project 9",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/project/9"
    },
    {
      title: "Project 10",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/project/10"
    },
  ]
  console.log("getProjects");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
  
  return projetcs
}

async function getTeams () {
  const teams = [
    {
      title: "Team 1",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/team/1"
    },
    {
      title: "Team 2",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/team/2"
    },
    {
      title: "Team 3",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/team/3"
    },
    {
      title: "Team 4",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/team/4"
    },
    {
      title: "Team 5",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/team/5"
    },
    {
      title: "Team 6",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/team/6"
    },
    {
      title: "Team 7",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/team/7"
    },
    {
      title: "Team 8",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/team/8"
    },
    {
      title: "Team 9",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/team/9"
    },
    {
      title: "Team 10",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/team/10"
    },
  ]
  console.log("getTeams");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
  
  return teams

}

async function getDocs () {
  const docs = [
    {
      title: "Doc 1",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/doc/1"
    },
    {
      title: "Doc 2",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/doc/2"
    },
    {
      title: "Doc 3",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/doc/3"
    },
    {
      title: "Doc 4",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/doc/4"
    },
    {
      title: "Doc 5",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/doc/5"
    },
    {
      title: "Doc 6",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/doc/6"
    },
    {
      title: "Doc 7",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/doc/7"
    },
    {
      title: "Doc 8",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/doc/8"
    },
    {
      title: "Doc 9",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/doc/9"
    },
    {
      title: "Doc 10",
      type: "link",
      icon: <FaPlus />,
      url: "https://example.com/doc/10"
    },
  ]
  console.log("getDocs");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
  
  return docs


}

export const types = [
  {
    name: "link",
    icon: <MdOutlineLink />,
  },
  {
    name: "action",
    icon: <TbTargetArrow />,
  }
]

const newData = [
  {
    title: "Home",
    items: [
      {
        title: "About Us",
        url: "https://example.com/about",
        type: "link",
        icon: <FaCircleInfo />
      },
      {
        title: "Products",
        type: "action",
        icon: <BsFillCartFill />,
        items: [
          {
            title: "Product 1",
            type: "link",
            icon: <BsFillCartFill />,
            url: "https://example.com/product/1"
          },
          {
            title: "Product 2",
            url: "https://example.com/product/2",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 3",
            url: "https://example.com/product/3",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 4",
            url: "https://example.com/product/4",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 5",
            url: "https://example.com/product/5",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 6",
            url: "https://example.com/product/6",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 7",
            url: "https://example.com/product/7",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 8",
            url: "https://example.com/product/8",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 9",
            url: "https://example.com/product/9",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 10",
            url: "https://example.com/product/10",
            type: "link",
            icon: <BsFillCartFill />
          },
        ]
      },
      {
        title: "Blog",
        url: "https://example.com/blog",
        type: "link",
        icon: <FaBlog />
      },
      {
        title: "FAQ",
        url: "https://example.com/faq",
        type: "link",
        icon: <FaQuestion />
      }
    ]
  },
  {
    title: "Help",
    items: [
      {
        title: "Contact",
        url: "https://example.com/contact",
        type: "link",
        icon: <IoMdMail />
      },
      {
        title: "Services",
        url: "https://example.com/services",
        type: "link",
        icon: <RiServiceFill />
      },
      {
        title: "Settings",
        type: "action",
        icon: <IoMdSettings />,
        items: [
          {
            title: "Seeting Group 1",
            type: null,
            items: [
              {
                title: "Setting 1",
                type: "action",
                icon: <IoMdSettings />,
                items: [
                  {
                    title: "Setting Temp 1",
                    url: "https://example.com/settings/1",
                    type: "link",
                    icon: <IoMdSettings />
                  },
                  {
                    title: "Setting Temp 2",
                    url: "https://example.com/settings/2",
                    type: "link",
                    icon: <IoMdSettings />
                  },
                  {
                    title: "Setting Temp 3",
                    url: "https://example.com/settings/3",
                    type: "link",
                    icon: <IoMdSettings />
                  }
                ]
              },
              {
                title: "Setting 2",
                url: "https://example.com/settings/2",
                type: "link",
                icon: <IoMdSettings />
              },
              {
                title: "Setting 3",
                url: "https://example.com/settings/3",
                type: "link",
                icon: <IoMdSettings />
              }
            ]
          },
          {
            title: "Seeting Group 2",
            type: null,
            items: [
              {
                title: "Setting 1",
                url: "https://example.com/settings/1",
                type: "link",
                icon: <IoMdSettings />
              },
              {
                title: "Setting 2",
                url: "https://example.com/settings/2",
                type: "link",
                icon: <IoMdSettings />
              },
              {
                title: "Setting 3",
                url: "https://example.com/settings/3",
                type: "link",
                icon: <IoMdSettings />
              }
            ]
          }
        ]
      }
    ]
  }
]

export const realData = [
  {
    title: "Projects",
    items: [
      {
        title: "Search Projects",
        type: "action",
        icon: <SlGrid />,
        cmd: {name: "Shift+P"},
        items: getProjects,
      },
      {
        title: "Create Project",
        type: "link",
        icon: <FaPlus />,
        url: "https://example.com/project/create"
      }
    ]
  },
  {
    title: "Teams",
    items: [
      {
        title: "Search Teams",
        type: "action",
        icon: <MdOutlineGroup />,
        cmd: {name: "Shift+T"},
        items: getTeams
      },
      {
        title: "Create Team",
        type: "link",
        icon: <FaPlus />,
        url: "https://example.com/team/create"
      }
    ]
  },
  {
    title: "Documentation",
    items: [
      {
        title: "Search Documentation",
        type: "action",
        icon: <IoMdDocument />,
        cmd: {name: "Shift+D"},
        items: getDocs
      }
    ]
  },
   {
    title: "Home",
    items: [
      {
        title: "About Us",
        url: "https://example.com/about",
        type: "link",
        icon: <FaCircleInfo />
      },
      {
        title: "Products",
        type: "action",
        icon: <BsFillCartFill />,
        items: [
          {
            title: "Product 1",
            type: "link",
            icon: <BsFillCartFill />,
            url: "https://example.com/product/1"
          },
          {
            title: "Product 2",
            url: "https://example.com/product/2",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 3",
            url: "https://example.com/product/3",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 4",
            url: "https://example.com/product/4",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 5",
            url: "https://example.com/product/5",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 6",
            url: "https://example.com/product/6",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 7",
            url: "https://example.com/product/7",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 8",
            url: "https://example.com/product/8",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 9",
            url: "https://example.com/product/9",
            type: "link",
            icon: <BsFillCartFill />
          },
          {
            title: "Product 10",
            url: "https://example.com/product/10",
            type: "link",
            icon: <BsFillCartFill />
          },
        ]
      },
      {
        title: "Blog",
        url: "https://example.com/blog",
        type: "link",
        icon: <FaBlog />
      },
      {
        title: "FAQ",
        url: "https://example.com/faq",
        type: "link",
        icon: <FaQuestion />
      }
    ]
  },
  {
    title: "Help",
    items: [
      {
        title: "Contact",
        url: "https://example.com/contact",
        type: "link",
        icon: <IoMdMail />
      },
      {
        title: "Services",
        url: "https://example.com/services",
        type: "link",
        icon: <RiServiceFill />
      },
      {
        title: "Settings",
        type: "action",
        icon: <IoMdSettings />,
        items: [
          {
            title: "Seeting Group 1",
            type: null,
            items: [
              {
                title: "Setting 1",
                type: "action",
                icon: <IoMdSettings />,
                items: [
                  {
                    title: "Setting Temp 1",
                    url: "https://example.com/settings/1",
                    type: "link",
                    icon: <IoMdSettings />
                  },
                  {
                    title: "Setting Temp 2",
                    url: "https://example.com/settings/2",
                    type: "link",
                    icon: <IoMdSettings />
                  },
                  {
                    title: "Setting Temp 3",
                    url: "https://example.com/settings/3",
                    type: "link",
                    icon: <IoMdSettings />
                  }
                ]
              },
              {
                title: "Setting 2",
                url: "https://example.com/settings/2",
                type: "link",
                icon: <IoMdSettings />
              },
              {
                title: "Setting 3",
                url: "https://example.com/settings/3",
                type: "link",
                icon: <IoMdSettings />
              }
            ]
          },
          {
            title: "Seeting Group 2",
            type: null,
            items: [
              {
                title: "Setting 1",
                url: "https://example.com/settings/1",
                type: "link",
                icon: <IoMdSettings />
              },
              {
                title: "Setting 2",
                url: "https://example.com/settings/2",
                type: "link",
                icon: <IoMdSettings />
              },
              {
                title: "Setting 3",
                url: "https://example.com/settings/3",
                type: "link",
                icon: <IoMdSettings />
              }
            ]
          }
        ]
      }
    ]
  }
]

const data = [
  {
    "id": 1,
    "title": "Home",
    "url": "https://example.com/",
    "type": "link",
    "icon": <GoHomeFill />
  },
  {
    "id": 2,
    "title": "About Us",
    "url": "https://example.com/about",
    "type": "link",
    "icon": <FaCircleInfo />
  },
  {
    "id": 3,
    "title": "Products",
    "type": "action",
    "icon": <BsFillCartFill />,
    "children": [
      {
        "id": 1,
        "title": "Product 1",
        "url": "https://example.com/product/1",
        "type": "link",
        "icon": <BsFillCartFill />
      },
      {
        "id": 2,
        "title": "Product 2",
        "url": "https://example.com/product/2",
        "type": "link",
        "icon": <BsFillCartFill />
      },
      {
        "id": 3,
        "title": "Product 3",
        "url": "https://example.com/product/3",
        "type": "link",
        "icon": <BsFillCartFill />
      },
      {
        "id": 4,
        "title": "Product 4",
        "url": "https://example.com/product/4",
        "type": "link",
        "icon": <BsFillCartFill />
      },
      {
        "id": 5,
        "title": "Product 5",
        "url": "https://example.com/product/5",
        "type": "link",
        "icon": <BsFillCartFill />
      },
      {
        "id": 6,
        "title": "Product 6",
        "url": "https://example.com/product/6",
        "type": "link",
        "icon": <BsFillCartFill />
      },
      {
        "id": 7,
        "title": "Product 7",
        "url": "https://example.com/product/7",
        "type": "link",
        "icon": <BsFillCartFill />
      },
      {
        "id": 8,
        "title": "Product 8",
        "url": "https://example.com/product/8",
        "type": "link",
        "icon": <BsFillCartFill />
      },
      {
        "id": 9,
        "title": "Product 9",
        "url": "https://example.com/product/9",
        "type": "link",
        "icon": <BsFillCartFill />
      },
      {
        "id": 10,
        "title": "Product 10",
        "url": "https://example.com/product/10",
        "type": "link",
        "icon": <BsFillCartFill />
      },
    ]
  },
  {
    "id": 4,
    "title": "Contact",
    "url": "https://example.com/contact",
    "type": "link",
    "icon": <IoMdMail />
  },
  {
    "id": 5,
    "title": "Blog",
    "url": "https://example.com/blog",
    "type": "link",
    "icon": <FaBlog />
  },
  {
    "id": 6,
    "title": "FAQ",
    "url": "https://example.com/faq",
    "type": "link",
    "icon": <FaQuestion />
  },
  {
    "id": 7,
    "title": "Services",
    "url": "https://example.com/services",
    "type": "link",
    "icon": <RiServiceFill />
  },
  {
    "id": 8,
    "title": "Settings",
    "url": "https://example.com/settings",
    "type": "link",
    "icon": <IoMdSettings />
  }
]

export {newData}
export default data;