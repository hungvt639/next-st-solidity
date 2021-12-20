import API from "../../api";
import Header from "../../components/Header";
import { BlogInterface } from "../../interface/api/blogAPI";

type PropsBlog = {
    data?: BlogInterface;
};
const Blog = ({ data }: PropsBlog) => {
    return (
        <>
            <Header />
            <div className="w-full max-w-screen-xl mx-auto">
                <h1>{data?.title}</h1>
                <div
                    dangerouslySetInnerHTML={{ __html: data?.content ?? "" }}
                ></div>
            </div>
        </>
    );
};
Blog.getInitialProps = async ({ query }: any) => {
    try {
        const res = await API.blog.getDataBlog(query.slug);
        return { data: res.data };
    } catch (e) {
        return {
            data: undefined,
        };
    }
};
export default Blog;
