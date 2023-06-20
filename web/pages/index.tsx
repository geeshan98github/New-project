import Register from "./register";
import {Page} from "../layouts/page";
import {Content} from "../layouts/content";

export default function Index() {
    return (
        <div>
            <Page title={"home"}>

                <div>
                  <Content content={
                      <h2>HOME</h2>
                  }/>
                </div>
            </Page>



        </div>

    );
}
