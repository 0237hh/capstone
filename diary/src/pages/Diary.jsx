import {useParams, useNavigate} from "react-router-dom";
import useDiary from "../hooks/useDiary.jsx";
import Button from "../components/Button.jsx";
import Header from "../components/Header.jsx";
import {getFormattedDate} from "../util.jsx";
import Viewer from "../components/Viewer.jsx";
import {useEffect} from "react";
import {setPageTitle} from "../util.jsx";

const Diary = () => {
  const {id} = useParams()
  const data = useDiary(id);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    setPageTitle(`${id}번 일기`);
  }, []);

  if(!data) {
    return <div>일기를 불러오고 있습니다...</div>
  } else {
    const {date, emotionId, content} = data;
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`
    return (
      <div>
        <Header
          title={title}
          leftChild={<Button text={"< 뒤로가기"} onClick={goBack}/> }
          rightChild={<Button text={">수정하기"} onClick={goEdit}/> }
        />
        <Viewer content={content} emotionId={emotionId} />
      </div>
    );
  }
};

export default Diary;
