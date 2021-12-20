import API from "../../api";
import { BlogInterface } from "../../interface/api/blogAPI";
import Header from "../../components/Header";
import Link from "next/link";
import { BLOG } from "../../config/constRouter";
type PropsListBlog = {
    data?: BlogInterface[];
};
const ListBlog = ({ data }: PropsListBlog) => {
    return (
        <>
            <Header />
            <div className="w-full max-w-screen-xl mx-auto">
                <h1>Danh sách các blog</h1>
                <div className="flex flex-col">
                    {data?.map((blog: BlogInterface, index: number) => (
                        <Link href={`${BLOG}/${blog.slug}`} key={index}>
                            <a className="border-solid border-slate-300 border-2 my-4 max-h-20 overflow-hidden text-black">
                                <h1 className="text-blue-500 text-lg">
                                    {blog.title}
                                </h1>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: blog.content,
                                    }}
                                ></div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

ListBlog.getInitialProps = async () => {
    try {
        const res = await API.blog.getListBlog();
        return { data: res.data };
    } catch (e) {
        return {
            data: undefined,
        };
    }
};
export default ListBlog;
