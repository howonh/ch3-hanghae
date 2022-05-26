const express = require("express")
const Article = require("../schemas/article")
const router = express.Router()

router.get("/", (req,res) => { // app.js 의 라우터가 "/api" 로 설정한 대로 감
    res.send("this is root page")
})


router.get("/articles", async (req,res) => { // 게시글 전체 조회
  const { authorname } = req.query
    const articles = await Article.find({authorname})
    res.json({
        articles
    })
})

router.get("/articles/:articleId", async (req, res) => { // 게시글 상세 조회
    const {articleId} = req.params
    const [detail] = await Article.find({articleId : Number(articleId)})
    res.json({
        detail
    })
})

router.post("/articles", async (req,res) => { // 게시글 작성
    const {articleId, title, content, Date, authorname, articlePw} = req.body
    
    const article = await Article.find({articleId})
    if (article.length) {
      return res.status(400).json({success : false, errorMessage : "이미 있는 데이터입니다."})
    }
    const createdArticle = await Article.create({articleId, title, content, Date, authorname, articlePw})

    res.json({article : createdArticle})
})

// 게시글 수정
router.put("/articles/:articleId", async (req,res) => {
  const {articleId} = req.params
  const {content} = req.body
  
  const updatearticle = await Article.find({articleId})
  if (!updatearticle.length) {
    return res.status(400).json({success : false, errorMessage : "없는 게시글 입니다."})
  }
  await Article.updateOne({articleId: Number(articleId)}, {$set: {content}});

  res.json({success: true});
})

// 게시글 삭제
router.delete("/articles/:articleId", async (req, res) => {
  const {articleId} = req.params;
  
  const removearticle = await Article.find({articleId : Number(articleId)});
  if (removearticle.length > 0) {
    await Article.deleteOne({articleId: Number(articleId)});
  }
  res.json({success: true});
});


module.exports = router

