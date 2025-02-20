import { Card, Button, Progress } from "@/components/ui";
import { HiBookOpen, HiVideoCamera } from "react-icons/hi";
import React from "react";

type Lesson = {
  title: string;
  duration: number;
  teacher: string;
  category: string;
  progress: number;
  history: string[];
  image: string;
  order: string
};

type LessonCardsProps = {
  openLessonHistory: (history: string[]) => void;
};

const lessons: Lesson[] = [
  {
    title: "Como Ganhar Dinheiro com Terras Pequenas",
    duration: 45,
    order: '01',
    teacher: "João Silva",
    category: "Investimento Rural",
    progress: 75,
    history: ["Aula 1", "Aula 2"],
    image: "https://i.ytimg.com/vi/d4WLSogML5s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDbsnqJe3P5PkDHQpsAV4zg_5c1dw",
  },
  {
    title: "Como Ganhar Dinheiro com Terras Pequenas",
    duration: 60,
    order: '02',
    teacher: "Maria Souza",
    category: "Investimento Rural",
    progress: 50,
    history: ["Aula 1"],
    image: "https://i.ytimg.com/vi/d4WLSogML5s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDbsnqJe3P5PkDHQpsAV4zg_5c1dw",
  },
  {
    title: "Como Ganhar Dinheiro com Terras Pequenas",
    duration: 90,
    order: '03',
    teacher: "Carlos Lima",
    category: "Investimento Rural",
    progress: 90,
    history: ["Aula 1", "Aula 2", "Aula 3"],
    image: "https://i.ytimg.com/vi/d4WLSogML5s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDbsnqJe3P5PkDHQpsAV4zg_5c1dw",
  },
];

const CardAulas: React.FC<LessonCardsProps> = ({ openLessonHistory }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {lessons.map((lesson, index) => (
        <Card
          key={index}
          clickable
          onClick={() => console.log("Aula selecionada", lesson.title)}
          header={{ content: 'Aula '+ lesson.order }}
        >
          <img src={lesson.image} alt={lesson.title} className="w-full h-40 object-cover rounded-lg mb-4" />
          <h5 className="p-2 text-lg font-bold break-words mb-4 whitespace-pre-wrap">{lesson.title}</h5>
          <div className="grid grid-cols-2 gap-2">
            <p className="p-2 break-words whitespace-pre-wrap">Duração</p>
            <p className="p-2 break-words whitespace-pre-wrap"><b>{lesson.duration} min</b></p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="p-2 break-words whitespace-pre-wrap">Professor</p>
            <p className="p-2 break-words whitespace-pre-wrap">{lesson.teacher}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <p className="p-2 break-words whitespace-pre-wrap">Categoria</p>
            <p className="p-2 break-words whitespace-pre-wrap">{lesson.category}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-5">
            <p className="p-2 break-words whitespace-pre-wrap">Progresso</p>
            <p className="p-2 break-words whitespace-pre-wrap">{lesson.progress}%</p>
          </div>
          <div><Progress percent={lesson.progress} /></div>
          <div className="mt-5">
            {lesson.history.length > 0 && (
              <Button
                variant="solid"
                block
                icon={<HiVideoCamera />}
                onClick={() => openLessonHistory(lesson.history)}
              >
                Acessar Aula
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardAulas;
