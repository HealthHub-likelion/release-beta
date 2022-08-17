import '../styles/components/ReadmeText.css'

function ReadmeText({readmeContent, setReadmeContent, update, textareaRef, userData}) {
    const showReadme = () =>{
        const line = userData.readMe.split('\n').map(line=>line);
        const list = [];

        for(let i = 0; i < line.length; i++){
            list.push(
                <div key={i}>{line[i]}</div>
            );
        }

        return list;
    }

    const changeContent = (e) =>{
        setReadmeContent(e.target.value);
    }

    return (
        <div className="ReadmeText">
            {update?
            <textarea ref={textareaRef} placeholder={readmeContent===''||!readmeContent?'자신을 소개해 보세요.':''}
                    value={readmeContent} onChange={(e)=>{changeContent(e)}}/>
            :readmeContent===''||!readmeContent
                ?<div className='noneText'>소개글이 없습니다.</div>
                :<div className='notnoneText'>{showReadme()}</div>}
        </div>
    );
}

export default ReadmeText;