import { BlogList, CommentList } from "../component/BlogList";
import BlogPosting from "../component/BlogPosting";
import { useEffect, useState } from "react";
import axios from "../util/axiosUtil";
import BlogWrite from '../component/BlogWrite';
import { useTranslator } from "../util/LanguageUtil";

let selectedPostDom = null;
function Blog(props) {
    const [blogArr, setBlogArr] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [newPost, setNewPost] = useState(null);
    const onTitleClick = (e, sq) => {
        setSelectedPost(sq);
        changeSelectedPost(e);
    }

    const changeSelectedPost = (e = null) => {
        // 같은 post 눌렀을 때 새로고침 기능으로 동작하도록 똑같이 다시 불러옴.
        // console.log('selectedPostDom', selectedPostDom);
        if(selectedPostDom) selectedPostDom.classList.remove('selected-post');
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
            result.forEach((blog) => {
                let _blog = <BlogList key={idx++} content={blog.TITLE} date={blog.DATE} sq={blog.BLOG_SQ} className='posting' onClick={(e, sq) => onTitleClick(e, sq)}></BlogList>
                if(firstFlag) {
                    _blog = <BlogList first="true" className="posting" key={idx++} content={blog.TITLE} date={blog.DATE} sq={blog.BLOG_SQ} onClick={(e, sq) => onTitleClick(e, sq)}></BlogList>
                    firstFlag = false;
                    setSelectedPost(blog.BLOG_SQ);
                }
                _blogArr.push(_blog);
            });
            setBlogArr(_blogArr);
        });
    }

    useEffect(()=> {
        selectedPostDom = document.querySelector('.selected-post');
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

    // useEffect(() => {
    //     getList();
    // }, [selectedPost]);

    const writeNewPosting = () => {
        setSelectedPost('new');
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