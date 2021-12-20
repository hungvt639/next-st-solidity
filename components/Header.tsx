import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";
import Link from "next/link";
import {
    BLOG,
    CREATE_BLOG,
    CREATE_PRODUCT,
    LIST_PRODUCT,
    MY_PRODUCT,
    PROFILE,
} from "../config/constRouter";

const Header = () => {
    const VIImg = "/img/vi.png";
    const ENImg = "/img/en.png";
    const { t, i18n } = useTranslation();

    function onLangChange() {
        let lg = "";
        if (i18n.language === "vi") {
            lg = "en";
        } else {
            lg = "vi";
        }
        i18n.changeLanguage(lg);
    }

    const menu = (
        <div>
            <div>
                <Link href={PROFILE}>Profile</Link>
            </div>
        </div>
    );
    const list = [
        {
            name: "List Product",
            url: LIST_PRODUCT,
        },
        {
            name: "Create Product",
            url: CREATE_PRODUCT,
        },
        
        {
            name: "My Product",
            url: MY_PRODUCT,
        },
    ];
    return (
        <div className="w-full h-24 header">
            <div className="max-w-screen-xl w-full flex h-full items-center justify-between mx-auto">
                <div className="flex ">
                    {list.map((l: any, i: number) => (
                        <Link href={l.url} key={i}>
                            <a className="mx-5 text-lg font-bold">{l.name}</a>
                        </Link>
                    ))}
                </div>
                <div className="flex items-center cursor-pointer">
                    <div
                        className="flex items-center mr-5"
                        onClick={onLangChange}
                    >
                        <img
                            className="img-language"
                            width="24px"
                            alt="language"
                            src={i18n.language === "vi" ? VIImg : ENImg}
                        />
                        {t("L")}
                    </div>
                    <Dropdown overlay={menu} placement="bottomRight">
                        <div className="btn-header">User</div>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};
export default Header;
