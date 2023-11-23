import { MdOutlineLink } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaCircleInfo } from "react-icons/fa6";
import { BsFillCartFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { FaBlog } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";


function getIcon(type) {
  switch (type) {
    case "link":
      return <MdOutlineLink />;
    default:
      return null;
  }
}

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