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
    "url": "https://example.com/products",
    "type": "link",
    "icon": <BsFillCartFill />
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

export default data;