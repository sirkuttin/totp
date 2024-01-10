all: public/bulma.min.css

public/bulma.min.css: node_modules/bulma/css/bulma.min.css node_modules/bulma-responsive-form-addons/bulma-responsive-form-addons.css
	cat $^ > $@

serve:
	cd public && python3 -m http.server 8888
