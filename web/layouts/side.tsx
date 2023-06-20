import {Ultra} from "next/dist/compiled/@next/font/dist/google";

export function Side(){
    return(
        <div className={" h-100 "} style={{backgroundColor:"lightblue",padding:"5px"}}>
            <div className={"logo w-100 text-center p-3"} style={{height:"15%"}}>
                <h2 >LOGO</h2>
            </div>
            <div className={"menu  pt-3 pe-4"} style={{height:"85%"}}>
                <ul style={{
                    listStyle:"none",


                }}>
                    <li><button className={"btn btn-light w-100 mb-3 bo"}><a href={"/register"}>Create</a></button></li>
                    <li><button className={"btn btn-light w-100 mb-3"}><a href={""}>List</a></button></li>
                </ul>

            </div>

        </div>
    )

}