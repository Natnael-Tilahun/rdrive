import { BsFileEarmarkCodeFill } from "react-icons/bs";
import {
  SiCss3,
  SiPython,
  SiGnubash,
  SiHtml5,
  SiReact,
  SiMarkdown,
  SiNextdotjs,
  SiVercel,
  SiTypescript,
  SiWindowsterminal,
} from "react-icons/si";
import { VscJson } from "react-icons/vsc";
import { IoLogoJavascript } from "react-icons/io5";
import { AiOutlineFileText, AiOutlineFolderOpen } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

type Props = {
  lang: string;
};

export default function CodeTitle({ lang }: Props) {
  let Icon, Title;
  switch (lang) {
    case "html":
      Icon = SiHtml5;
      Title = "HTML";
      break;
    case "css":
      Icon = SiCss3;
      Title = "CSS";
      break;
    case "js":
      Icon = IoLogoJavascript;
      Title = "JavaScript";
      break;
    case "bash":
      Icon = SiGnubash;
      Title = "Bash";
      break;
    case "py":
      Icon = SiPython;
      Title = "Python";
      break;
    case "json":
      Icon = VscJson;
      Title = "JSON";
      break;
    case "jsx":
      Icon = SiReact;
      Title = "JavaScript (JSX)";
      break;
    case "text":
      Icon = AiOutlineFileText;
      Title = "Text";
      break;
    case "md":
      Icon = SiMarkdown;
      Title = "Markdown";
      break;
    case "next":
      Icon = SiNextdotjs;
      Title = "Next.js";
      break;
    case "directory":
      Icon = AiOutlineFolderOpen;
      Title = "Directory";
      break;
    case "vercel":
      Icon = SiVercel;
      Title = "Vercel";
      break;
    case "ts":
    case "tsx":
      Icon = SiTypescript;
      Title = "TypeScript";
      break;
    case "cmd":
      Icon = SiWindowsterminal;
      Title = "Command Prompt";
      break;
    case "username":
      Icon = FaUserCircle;
      Title = "User Name";
      break;
    case "password":
      Icon = RiLockPasswordFill;
      Title = "Password";
    break;
    default:
      Icon = BsFileEarmarkCodeFill;
      Title = "Code";
      break;
  }
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5" />
      <p className="!my-0 font-[500] text-sm">{Title}</p>
    </div>
  );
}