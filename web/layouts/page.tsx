import {ReactNode} from "react";
import {Side} from "./side";
import {Content} from "./content";

type PageProps = {
    title: string;
    children: ReactNode | ReactNode[];
}

export function Page(props: PageProps) {
    return (
        <div>
            <title>{props.title}</title>
            <div className={"row w-100 "} style={{height: "100vh"}}>

                <div className={"col-2  "}>
                    <Side/>
                </div>
                <div className={"col-10 "}>
                    <Content content={props.children}/>
                </div>
            </div>
        </div>


    )
}