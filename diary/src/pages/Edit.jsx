import {useParams, useNavigate} from "react-router-dom";
import useDiary from "../hooks/useDiary.jsx";
import Button from "../components/Button.jsx";
import Header from "../components/Header.jsx";
import {useContext, useEffect} from "react";
import {DiaryDispatchContext} from "../App.jsx";
import Editor from "../components/Editor.jsx";
import {setPageTitle} from "../util.jsx";


const Edit = () => {
  const {id} = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const {onDelete, onUpdate} =useContext(DiaryDispatchContext);
  const onClickDelte = () => {
    if(window.confirm("일기장을 정말 삭제할가요? 다시 복구되지 않아요!")) {
      onDelete(id);
      navigate("/", {replace: true});
    }
  };

  const goBack = () => {
    navigate(-1);
  }

  const onSubmit = (data) => {
    if(window.confirm("일기를 정말 수정할까요?")) {
      const {date, content, emotionId} = data;
      onUpdate(id, date, content, emotionId);
      navigate("/", {replace: true});
    }
  }

  useEffect(() => {
    setPageTitle(`${id}번 일기 수정하기`);
  }, []);

  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>
  } else {
    return (
      <div>
        <Header
          title={"일기 수정하기"}
          leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
          rightChild={<Button type={"navigate"} text={"삭제하기"} onClick={onClickDelte}/>}
        />
        <Editor initData={data} onSubmit={onSubmit}/>
      </div>
    )
  }
};

export default Edit
