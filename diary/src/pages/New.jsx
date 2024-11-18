import {useNavigate} from "react-router-dom";
import Button from "../components/Button.jsx";
import Header from "../components/Header.jsx";
import Editor from "../components/Editor.jsx";
import {useContext, useEffect} from "react";
import {DiaryDispatchContext} from "../App.jsx";
import {setPageTitle} from "../util.jsx";

const New = () => {
  const {onCreate} = useContext(DiaryDispatchContext);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const onSubmit = (data) => {
    const {date, content, emotionId} = data;
    onCreate(date, content, emotionId);
    navigate("/", {replace:true});
  };

  useEffect(() => {
    setPageTitle("새 일기 쓰기");
  }, []);

  return(
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
      />
      <Editor onSubmit={onSubmit}/>
    </div>
  );
};

export default New
