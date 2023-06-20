import {ReactNode} from "react";
import 'bootstrap/dist/css/bootstrap.css'

type contentProps = {

    content: ReactNode | ReactNode[];
}
export function Content(props:contentProps){
    return(
        <div style={{height:"100%",paddingLeft:"20px",paddingTop:"30px"}}>
            {props.content}
        </div>
    )

}