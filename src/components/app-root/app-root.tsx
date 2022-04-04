import { Component, h } from "@stencil/core";
import { store } from "@stencil/redux";
import { configureStore } from "../../redux/RootStore";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
  shadow: true,
})
export class AppRoot {
  componentWillLoad() {
    store.setStore(configureStore({}));
  }
  render() {
    return (
      <div>
        <header>
          <h1>Pok&eacute;mon Evolution Chains</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/profile/:name" component="app-profile" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
