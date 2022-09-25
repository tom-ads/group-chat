import { Route, Routes } from "react-router-dom"
import RootPage from "../pages"

const Router = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<RootPage />} />
        </Routes>
    )
}

export default Router