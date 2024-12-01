import {
  Home,
  ReceiptText,
  BookHeart,
  Logs,
  Videotape,
  NotebookText,
  FolderGit2,
  Newspaper,
  Contact,
} from "lucide-react";

export function getMenuList(pathname) {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Home",
          active: pathname === "/",
          icon: Home,
          submenus: [],
        },
        {
          href: "/about",
          label: "About",
          active: pathname.includes("/about"),
          icon: BookHeart,
          submenus: [],
        },
        {
          href: "/blogs",
          label: "Blogs",
          active: pathname.includes("/blogs"),
          icon: Logs,
          submenus: [],
        },
        {
          href: "/courses",
          label: "Courses",
          active: pathname.includes("/courses"),
          icon: Videotape,
          submenus: [],
        },
        {
          href: "/notes",
          label: "Notes",
          active: pathname.includes("/notes"),
          icon: NotebookText,
          submenus: [],
        },
        {
          href: "/projects",
          label: "Projects",
          active: pathname.includes("/projects"),
          icon: FolderGit2,
          submenus: [],
        },
        {
          href: "/merchandise",
          label: "Merchandise",
          active: pathname.includes("/merchandise"),
          icon: ReceiptText,
          submenus: [],
        },
        {
          href: "/newsletter",
          label: "Newsletter",
          active: pathname.includes("/newsletter"),
          icon: Newspaper,
          submenus: [],
        },
        {
          href: "/contact",
          label: "Contact",
          active: pathname.includes("/contact"),
          icon: Contact,
          submenus: [],
        },
      ],
    },
  ];
}
