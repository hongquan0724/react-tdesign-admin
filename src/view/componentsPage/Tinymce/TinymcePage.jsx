

import Tinymce from "@/view/article/CreateArticle/Tinymce.jsx";
import {useEffect, useRef, useState} from "react";
function TinymcePage(){
    const [TinymceContent,setTinymceContent] = useState(``);
    const TinymceRef = useRef(null);
    const getTinymceContent = (data)=>{
        setTinymceContent(data);
    }
    useEffect(() => {
        if(TinymceRef.current){
            TinymceRef.current.setTinymceContent(`<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>
<p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97"></p>
<ul>
<li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
<li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li>
<li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
</ul>`)
        }

    },[TinymceRef])
    return (
        <div className="components-container">
            <aside>
                Rich text is a core feature of the management backend, but at the same time it is a place with lots of
                pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the
                market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison
                and introduction.
                <a target="_blank" className="link-type"
                   href="https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html">Documentation</a>
            </aside>
            <div style={{paddingBottom:'1rem'}}>
                <Tinymce ref={TinymceRef} getTinymceContent={getTinymceContent} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: TinymceContent }}>
            </div>
        </div>
    )
}

export default TinymcePage;