import {Card, Progress} from "tdesign-react";
import PanThumb from "@/components/avatar/PanThumb.jsx";


const BoxCard = () => {
    const progresslist = [
        {name:'react',value:70},
        {name:'JavaScript',value:18},
        {name:'less',value:12},
        {name:'vite',value:12},
        {name:'tdesign-react',value:100},
    ]
    const cardcontent  = <div className="card-content">
        <PanThumb className="panThumb" image={'/img/App/avatar.gif'} />
        {progresslist.map((m,i)=> {
          return <div className="progress-item" key={m.name+i}>
              <span>{m.name}</span>
              <Progress
                  label
                  percentage={m.value}
                  theme="line"
              />
          </div>
        })}

    </div>


    return (
        <Card
            className="box-card-container"
            header={
                <div className="box-card-header">
                    <img src="/img/home/home_card_bg.png"/>
                </div>
            }
        >
            {cardcontent}
        </Card>
        )
}

export default BoxCard
