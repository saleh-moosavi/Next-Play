import Articles from "./components/Articles";
import Header from "./components/Header";
import Newest from "./components/Newest";

export default function Index() {
  return (
    <div className="xl:max-w-5xl xl:mx-auto">
      <Header />
      <Newest />
      <Articles />
    </div>
  );
}
