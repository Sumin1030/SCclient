import { BlogList, CommentList } from "../component/BlogList";
import BlogPosting from "../component/BlogPosting";
import { useEffect, useState } from "react";
import axios from "../util/axiosUtil";
import BlogWrite from '../component/BlogWrite';
import { useTranslator } from "../util/LanguageUtil";

let selectedPostDom = null;
let newFlag = false;
function Blog(props) {
    const [blogArr, setBlogArr] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [newPost, setNewPost] = useState(null);
    const onTitleClick = (e, sq) => {
        setSelectedPost(sq);
        changeSelectedPost(e);
    }

    const changeSelectedPost = (e = null) => {
        // console.log('selectedPostDom', selectedPostDom);
        if(selectedPostDom) selectedPostDom.classList.remove('selected-post');
        selectedPostDom = null;
        if(e) {
            selectedPostDom = e.currentTarget;
            // console.log('selectedPostDom 바꿈', selectedPostDom);
            selectedPostDom.classList.add('selected-post');
        }
    }

    const getList = () => {
        let sq;
        axios.get('/api/getBlogList').then((res) => {
            const result = res.data.result;
            const _blogArr = [];
            let idx = 0;
            let firstFlag = true;
            console.log("selectedPostDom", selectedPostDom);
            result.forEach((blog) => {
                let _blog = <BlogList key={idx++} content={blog.TITLE} date={blog.DATE} sq={blog.BLOG_SQ} className='posting' onClick={(e, sq) => onTitleClick(e, sq)}></BlogList>
                if(firstFlag && !selectedPostDom) {
                    console.log("자동 선택");
                    _blog = <BlogList className="posting selected-post" key={idx++} content={blog.TITLE} date={blog.DATE} sq={blog.BLOG_SQ} onClick={(e, sq) => onTitleClick(e, sq)}></BlogList>
                    firstFlag = false;
                    setSelectedPost(blog.BLOG_SQ);
                }
                _blogArr.push(_blog);
            });
            console.log(_blogArr[0]);
            setBlogArr(_blogArr);
        });
    }

    useEffect(()=> {
        // console.log('새로 재정의');
        if(!selectedPostDom) selectedPostDom = document.querySelector('.selected-post');
        console.log(blogArr[0], blogArr[1]);
    }, [blogArr]);

    const _content = useTranslator('blog.newPost');
    useEffect(() =>{
        axios.get('/api/isLogined').then((res) => {
            if(res.data != "" && res.data.name == 'MASTER') {
                setNewPost(<BlogList className='new' onClick={() => writeNewPosting()} content={' + '+_content} />);
            }
        });
        getList();
    }, []);

    useEffect(() => {
        // 새 글을 썼을 때만 list 갱신함.
        if(newFlag && selectedPost != 'new') {
            getList();
            newFlag = false;
        }
    }, [selectedPost]);

    const writeNewPosting = () => {
        setSelectedPost('new');
        newFlag = true;
        console.log('새로운 글 쓰기', newFlag);
        changeSelectedPost();
    }

    return (
        <div className="blog">
            <div className='posting-list'>
                {newPost}
                {blogArr}
            </div>
            {
                selectedPost != 'new' ? <BlogPosting selectedPost={selectedPost} /> : <BlogWrite setSelectedPost={setSelectedPost}/>
            }
            <CommentList selectedPost={selectedPost} />
        </div>
    );
}

export default Blog;