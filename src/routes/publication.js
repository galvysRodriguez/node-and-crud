const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database');

router.get('/', async (req, res) => {
    const genpublication = await pool.query('SELECT * FROM publication')
    res.render('publication/publication', {genpublication});
})

router.get('/create', isLoggedIn, (req,res) => res.render('publication/create'))

router.post('/create', isLoggedIn, async (req, res) => {
    const {title, description, img, price, ubication } = req.body;
    const newpublication = {
        title,
        description,
        user_id: req.user.id,
        img,
        price,
        ubication
    };
    await pool.query('INSERT INTO publication set ?', [newpublication]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/');
});

router.get('/mysales', isLoggedIn, async (req, res) => {
    const mysend = await pool.query('SELECT * FROM transactionp WHERE thebuy =?',[req.user.id])
    const publicationonlist = await pool.query('SELECT * FROM publication WHERE user_id = ?', [req.user.id])
    res.render('login/list', { publicationonlist, mysend })
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM publication WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/publication');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM publication WHERE id = ?', [id]);
    res.render('links/edit', {publication: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url} = req.body; 
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE publication set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/publication');
});

router.get('/myshopping', isLoggedIn, async(req, res) => {
    let mybuy = await pool.query('SELECT * FROM transactionp WHERE thebuy=?',[req.user.id])
    res.render('publication/myshopping', {mybuy})
    
})

router.post('/myshopping/:id', isLoggedIn, async (req,res)=>{
    const {id } = req.params
    const article = await pool.query('SELECT * FROM publication WHERE id=?', [id])
    const transaction = article[0]
    const idarticle = transaction.id
    const userarticle = transaction.user_id
    const newbuyarticle = {
        publication_id: idarticle,
        user_id: req.user.id,
    }
    const newsendarticle = {
        publication_id: idarticle,
        user_id: userarticle
    }
    const newtransaction = {
        publication_id : idarticle,
        title: transaction.title,
        user_id: userarticle,
        description: transaction.description,
        img: transaction.img,
        price: transaction.price,
        ubication: transaction.ubication,
        thebuy : userarticle
    }

    await pool.query('INSERT INTO transactionp set ?', [newtransaction])
    await pool.query('INSERT INTO shopping set ?', [newbuyarticle]);
    await pool.query('INSERT INTO sales set ?', [newsendarticle]);
    await pool.query('DELETE FROM publication WHERE id = ?',[idarticle] )
    res.redirect('/publication/myshopping')
})
module.exports = router;