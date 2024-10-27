class ViewController {
    async register(req, res) {
        if (req.user) {
            return res.redirect("profile");
        }
        res.render("register");
    }
    async login(req, res) {
        if (req.user) {
            return res.redirect("profile");
        }
        res.render("login");
    }
    async profile(req, res) {
        // if (!req.user) {
        //     return res.redirect("login");
        // }

        res.render("profile", {user: req.session})
    }
    async realtimeproducts(req, res){
        res.render("realtimeproducts")
    }
 
}

export default new ViewController();
