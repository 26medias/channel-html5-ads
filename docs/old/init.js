/////////////////////////////////////////////////:
/////////////////////////////////////////////////:
	function Extraction_Valeur(pMode)
	{
		allDimCalculee = new Array();
		var nb_balise = allBalise.length;
		
		allDimDom = new Array();
		for(var i=0;i<nb_balise;i++)
		{
			var maBalise = allBalise[i];
			var allDim = $(maBalise).attr("data-dim");
			var infoDim = allDim.split("X");
			
			allDimDom.push(infoDim);
		}
	}
	function Build_Publicite(pMode)
	{
		var maBalise = allBalise[0];
		var Largeur_initiale;
		var Hauteur_initiale;
		
		//Dimension Publicites
		if(L<H)
		{
			Largeur_initiale = allDimDom[0][0];
			Hauteur_initiale = allDimDom[0][1];
		}
		else
		{
			Largeur_initiale = allDimDom[0][1];
			Hauteur_initiale = allDimDom[0][0];
		}
		
		//Redimention & Position FOND 
		var Hauteur_Calculee = H;
		var Largeur_Calculee = Largeur_initiale*Hauteur_Calculee/Hauteur_initiale;
		var PosX_Calculee = (L-Largeur_Calculee)/2;
		var PosY_Calculee = 0;
		var configDiv = new Array();
		configDiv.width = Math.ceil(Largeur_Calculee)+"px";
		configDiv.left = Math.ceil(PosX_Calculee)+"px";
		$(maBalise).css(configDiv);
		
		//Retour dim/Pos
		var dimpos = new Array();
		dimpos.push(Largeur_Calculee);
		dimpos.push(Hauteur_Calculee);
		dimpos.push(PosX_Calculee);
		dimpos.push(PosY_Calculee);
		allDimCalculee[0] = dimpos;
		
		var rho = (Largeur_initiale*Hauteur_Calculee)/(Hauteur_initiale*Largeur_Calculee);
		
		//DBG2(dimpos[0]+"|"+dimpos[1]+"|"+dimpos[2]+"|"+dimpos[3]+"|rho="+rho);
		
	}
	function Build_Image(pMode)
	{
		var maBalise = allBalise[1];
		var Largeur_initiale;
		var Hauteur_initiale;
		var fileImage_actuel = $(maBalise).attr("src");
		
		//Dimension Publicites
		if(L<H)
		{
			fileImage_apres = fileImage_actuel.replace("H","V");
			Largeur_initiale = allDimDom[1][0];
			Hauteur_initiale = allDimDom[1][1];
		}
		else
		{
			fileImage_apres = fileImage_actuel.replace("V","H");
			Largeur_initiale = allDimDom[1][2];
			Hauteur_initiale = allDimDom[1][3];
		}
		//Changement image
		$(maBalise).attr("src",fileImage_apres);
		
		//Extraction Dimension Publicite
		var Lc_pub = allDimCalculee[0][0];
		var Hc_pub = allDimCalculee[0][1];
		var PXc_pub = allDimCalculee[0][2];
		var PYc_pub = allDimCalculee[0][3];
		var MargeSupInf = allDimDom[0][2];
		
		//Redimention & Position Image
		var Largeur_Calculee = Lc_pub;
		var Hauteur_Calculee = Lc_pub*Hauteur_initiale/Largeur_initiale;
		var PosX_Calculee = 0;
		var PosY_Calculee = MargeSupInf*Lc_pub/Largeur_initiale;
		var configDiv = new Array();
		configDiv.top = Math.ceil(PosY_Calculee)+"px";
		configDiv.height = Math.ceil(Hauteur_Calculee)+"px";
		$(maBalise).css(configDiv);
		
		//Retour dim/Pos
		var dimpos = new Array();
		dimpos.push(Largeur_Calculee);
		dimpos.push(Hauteur_Calculee);
		dimpos.push(PosX_Calculee);
		dimpos.push(PosY_Calculee);
		allDimCalculee[1] = dimpos;
	}
	function Build_TexteHaut(pMode)
	{
		var maBalise = allBalise[2];
		var Largeur_initiale = allDimDom[2][0];
		var Hauteur_initiale = allDimDom[2][1];
		
		//Extraction Dimension Publicite
		var Lc_pub = allDimCalculee[0][0];
		var Hc_pub = allDimCalculee[0][1];
		var PXc_pub = allDimCalculee[0][2];
		var PYc_pub = allDimCalculee[0][3];
		var Linit_pub = allDimDom[0][0];
		var MargeSupInf = allDimDom[0][2];
		
		//Extraction Dimension image
		var Lc_Image = allDimCalculee[1][0];
		var Hc_Image = allDimCalculee[1][1];
		var PXc_Image = allDimCalculee[1][2];
		var PYc_Image = allDimCalculee[1][3];
		
		//Redimention & Position Image
		var Hauteur_Calculee = Hauteur_initiale*PYc_Image/MargeSupInf;
		var Largeur_Calculee = Hauteur_Calculee*Largeur_initiale/Hauteur_initiale;
		var PosX_Calculee = (Lc_pub-Largeur_Calculee)/2;
		var PosY_Calculee = (PYc_Image-Hauteur_Calculee)/2;
		var configDiv = new Array();
		configDiv.left = Math.ceil(PosX_Calculee)+"px";
		configDiv.top = Math.ceil(PosY_Calculee)+"px";
		configDiv.height = Math.ceil(Hauteur_Calculee)+"px";
		$(maBalise).css(configDiv);
		
		//Retour dim/Pos
		var dimpos = new Array();
		dimpos.push(Largeur_Calculee);
		dimpos.push(Hauteur_Calculee);
		dimpos.push(PosX_Calculee);
		dimpos.push(PosY_Calculee);
		allDimCalculee[2] = dimpos;
	}
	function Build_TexteCentre(pMode)
	{
		var maBalise = allBalise[3];
		var Largeur_initiale = allDimDom[3][0];
		var Hauteur_initiale = allDimDom[3][1];
		
		//Dimension Publicites
		if(L<H)
		{
			Decallage_initiale = allDimDom[3][2];
		}
		else
		{
			Decallage_initiale = allDimDom[3][3];
		}
		
		//Extraction Dimension Publicite
		var Lc_pub = allDimCalculee[0][0];
		var Hc_pub = allDimCalculee[0][1];
		var PXc_pub = allDimCalculee[0][2];
		var PYc_pub = allDimCalculee[0][3];
		var Linit_pub = allDimDom[0][0];
		var Hinit_pub = allDimDom[0][1];
		var MargeSupInf = allDimDom[0][2];
		
		//Extraction Dimension image
		var Lc_Image = allDimCalculee[1][0];
		var Hc_Image = allDimCalculee[1][1];
		var PXc_Image = allDimCalculee[1][2];
		var PYc_Image = allDimCalculee[1][3];
		
		//Extraction Dimension TexteHaut
		var Lc_txtH = allDimCalculee[2][0];
		var Hc_txtH = allDimCalculee[2][1];
		var PXc_txtH = allDimCalculee[2][2];
		var PYc_txtH = allDimCalculee[2][3];
		var Hinit_txtH = allDimDom[2][1];
		
		//Redimention & Position Image
		var Hauteur_Calculee = Hauteur_initiale*Hc_txtH/Hinit_txtH;
		var Largeur_Calculee = Hauteur_Calculee*Largeur_initiale/Hauteur_initiale;
		var PosX_Calculee = (Lc_pub-Largeur_Calculee)/2;
		var PosY_Calculee = Hc_pub-(Decallage_initiale*Hc_pub/Hinit_pub);
		var configDiv = new Array();
		configDiv.left = Math.ceil(PosX_Calculee)+"px";
		configDiv.top = Math.ceil(PosY_Calculee)+"px";
		configDiv.height = Math.ceil(Hauteur_Calculee)+"px";
		$(maBalise).css(configDiv);
		
		//Retour dim/Pos
		var dimpos = new Array();
		dimpos.push(Largeur_Calculee);
		dimpos.push(Hauteur_Calculee);
		dimpos.push(PosX_Calculee);
		dimpos.push(PosY_Calculee);
		allDimCalculee[3] = dimpos;
	}
	function Build_TexteBas(pMode)
	{
		var maBalise = allBalise[4];
		var Largeur_initiale = allDimDom[4][0];
		var Hauteur_initiale = allDimDom[4][1];
		
		//Extraction Dimension Publicite
		var Lc_pub = allDimCalculee[0][0];
		var Hc_pub = allDimCalculee[0][1];
		var PXc_pub = allDimCalculee[0][2];
		var PYc_pub = allDimCalculee[0][3];
		var Linit_pub = allDimDom[0][0];
		var Hinit_pub = allDimDom[0][1];
		var MargeSupInf = allDimDom[0][2];
		
		//Extraction Dimension image
		var Lc_Image = allDimCalculee[1][0];
		var Hc_Image = allDimCalculee[1][1];
		var PXc_Image = allDimCalculee[1][2];
		var PYc_Image = allDimCalculee[1][3];
		
		//Extraction Dimension TexteHaut
		var Lc_txtH = allDimCalculee[2][0];
		var Hc_txtH = allDimCalculee[2][1];
		var PXc_txtH = allDimCalculee[2][2];
		var PYc_txtH = allDimCalculee[2][3];
		var Hinit_txtH = allDimDom[2][1];
		
		//Redimention & Position Image
		var Hauteur_Calculee = Hauteur_initiale*Hc_txtH/Hinit_txtH;
		var Largeur_Calculee = Hauteur_Calculee*Largeur_initiale/Hauteur_initiale;
		var PosX_Calculee = (Lc_pub-Largeur_Calculee)/2;
		var PosY_Calculee = (2*Hc_pub-PYc_Image-Hauteur_Calculee)/2;
		var configDiv = new Array();
		configDiv.left = Math.ceil(PosX_Calculee)+"px";
		configDiv.top = Math.ceil(PosY_Calculee)+"px";
		configDiv.height = Math.ceil(Hauteur_Calculee)+"px";
		$(maBalise).css(configDiv);
		
		//Retour dim/Pos
		var dimpos = new Array();
		dimpos.push(Largeur_Calculee);
		dimpos.push(Hauteur_Calculee);
		dimpos.push(PosX_Calculee);
		dimpos.push(PosY_Calculee);
		allDimCalculee[4] = dimpos;
	}
	function Build_TexteSearch(pMode)
	{
		var maBalise = allBalise[5];
		var Largeur_initiale = allDimDom[5][0];
		var Hauteur_initiale = allDimDom[5][1];
		
		//Extraction Dimension Publicite
		var Lc_pub = allDimCalculee[0][0];
		var Hc_pub = allDimCalculee[0][1];
		var PXc_pub = allDimCalculee[0][2];
		var PYc_pub = allDimCalculee[0][3];
		var Linit_pub = allDimDom[0][0];
		var Hinit_pub = allDimDom[0][1];
		var MargeSupInf = allDimDom[0][2];
		
		//Extraction Dimension image
		var Lc_Image = allDimCalculee[1][0];
		var Hc_Image = allDimCalculee[1][1];
		var PXc_Image = allDimCalculee[1][2];
		var PYc_Image = allDimCalculee[1][3];
		
		//Extraction Dimension TexteHaut
		var Lc_txtH = allDimCalculee[2][0];
		var Hc_txtH = allDimCalculee[2][1];
		var PXc_txtH = allDimCalculee[2][2];
		var PYc_txtH = allDimCalculee[2][3];
		var Hinit_txtH = allDimDom[2][1];
		
		//Redimention & Position Image
		var Hauteur_Calculee = Hauteur_initiale*Hc_txtH/Hinit_txtH;
		var Largeur_Calculee = Hauteur_Calculee*Largeur_initiale/Hauteur_initiale;
		var PosX_Calculee = (Lc_pub-Largeur_Calculee)/2;
		var PosY_Calculee = Hc_pub-Hauteur_Calculee-10;
		var configDiv = new Array();
		configDiv.top = Math.ceil(PosY_Calculee)+"px";
		configDiv.height = Math.ceil(Hauteur_Calculee)+"px";
		$(maBalise).css(configDiv);
		
		//Retour dim/Pos
		var dimpos = new Array();
		dimpos.push(Largeur_Calculee);
		dimpos.push(Hauteur_Calculee);
		dimpos.push(PosX_Calculee);
		dimpos.push(PosY_Calculee);
		allDimCalculee[5] = dimpos;
	}
	function Build_Rideau(pMode)
	{
		var maBalise = allBalise[6];
		var Largeur_initiale;
		var Hauteur_initiale;
		
		//Dimension Publicites
		if(L<H)
		{
			Largeur_initiale = allDimDom[0][0];
			Hauteur_initiale = allDimDom[0][1];
		}
		else
		{
			Largeur_initiale = allDimDom[0][1];
			Hauteur_initiale = allDimDom[0][0];
		}
		
		//Extraction Dimension Publicite
		var Lc_pub = allDimCalculee[0][0];
		var Hc_pub = allDimCalculee[0][1];
		var PXc_pub = allDimCalculee[0][2];
		var PYc_pub = allDimCalculee[0][3];
		var MargeSupInf = allDimDom[0][2];
		
		//Redimention & Position FOND 
		var Hauteur_Calculee = H;
		var Largeur_Calculee = Largeur_initiale*Hauteur_Calculee/Hauteur_initiale;
		var PosX_Calculee = (L-Largeur_Calculee)/2;
		var PosY_Calculee = 0;
		var configDiv = new Array();
		configDiv.width = Math.ceil(Largeur_Calculee)+"px";
		configDiv.height = Math.ceil(Hauteur_Calculee)+"px";
		configDiv.left = Math.ceil(PosX_Calculee)+"px";
		$(maBalise).css(configDiv);
		
		//Retour dim/Pos
		var dimpos = new Array();
		dimpos.push(Largeur_Calculee);
		dimpos.push(Hauteur_Calculee);
		dimpos.push(PosX_Calculee);
		dimpos.push(PosY_Calculee);
		allDimCalculee[6] = dimpos;
	}
	function Build_Vollets(pMode)
	{
		var maBalise1 = allBalise[7];
		var maBalise2 = allBalise[8];
		var Largeur_initiale;
		var Hauteur_initiale;
		
		//Dimension Publicites
		if(L<H)
		{
			Largeur_initiale = allDimDom[0][0];
			Hauteur_initiale = allDimDom[0][1];
		}
		else
		{
			Largeur_initiale = allDimDom[0][1];
			Hauteur_initiale = allDimDom[0][0];
		}
		
		//Extraction Dimension Publicite
		var Lc_pub = allDimCalculee[0][0];
		var Hc_pub = allDimCalculee[0][1];
		var PXc_pub = allDimCalculee[0][2];
		var PYc_pub = allDimCalculee[0][3];
		var MargeSupInf = allDimDom[0][2];
		
		//Extraction Dimension image
		var Lc_Image = allDimCalculee[1][0];
		var Hc_Image = allDimCalculee[1][1];
		var PXc_Image = allDimCalculee[1][2];
		var PYc_Image = allDimCalculee[1][3];
		
		//Extraction Dimension Rideau
		var Lc_rideau = allDimCalculee[6][0];
		var Hc_rideau = allDimCalculee[6][1];
		var PXc_rideau = allDimCalculee[6][2];
		var PYc_rideau = allDimCalculee[6][3];
		
		//Redimention & Position FOND 
		var Hauteur_Calculee1 = Hc_Image/2;
		var Largeur_Calculee1 = Lc_rideau;
		var PosX_Calculee1 = 0;
		var PosY_Calculee1 = PYc_Image;
		var configDiv = new Array();
		configDiv.width = Math.ceil(Largeur_Calculee1)+"px";
		configDiv.height = Math.ceil(Hauteur_Calculee1)+"px";
		configDiv.top = Math.ceil(PosY_Calculee1)+"px";
		$(maBalise1).css(configDiv);
		
		//Redimention & Position FOND 
		var Hauteur_Calculee2 = Math.ceil(Hauteur_Calculee1)+1;
		var Largeur_Calculee2 = Lc_rideau;
		var PosX_Calculee2 = 0;
		var PosY_Calculee2 = PYc_Image+Hauteur_Calculee2;
		var configDiv = new Array();
		configDiv.width = Math.ceil(Largeur_Calculee2)+"px";
		configDiv.height = Math.ceil(Hauteur_Calculee2)+"px";
		configDiv.top = Math.ceil(PosY_Calculee2)+"px";
		$(maBalise2).css(configDiv);
		
		//Retour dim/Pos
		var dimpos = new Array();
		dimpos.push(Largeur_Calculee1);
		dimpos.push(Hauteur_Calculee1);
		dimpos.push(PosX_Calculee1);
		dimpos.push(PosY_Calculee1);
		allDimCalculee[7] = dimpos;
		var dimpos = new Array();
		dimpos.push(Largeur_Calculee2);
		dimpos.push(Hauteur_Calculee2);
		dimpos.push(PosX_Calculee2);
		dimpos.push(PosY_Calculee2);
		allDimCalculee[8] = dimpos;
	}
/////////////////////////////////////////////////
/////////////////////////////////////////////////
	function Animation(pMode)
	{
		//Extraction Dimension image
		var Lc_Image = allDimCalculee[1][0];
		var Hc_Image = allDimCalculee[1][1];
		var PXc_Image = allDimCalculee[1][2];
		var PYc_Image = allDimCalculee[1][3];
		//Extraction Dimension Rideau
		var Lc_vollet1 = allDimCalculee[7][0];
		var Hc_vollet1 = allDimCalculee[7][1];
		var PXc_vollet1 = allDimCalculee[7][2];
		var PYc_vollet1 = allDimCalculee[7][3];
		//Extraction Dimension Rideau
		var Lc_vollet2 = allDimCalculee[8][0];
		var Hc_vollet2 = allDimCalculee[8][1];
		var PXc_vollet2 = allDimCalculee[8][2];
		var PYc_vollet2 = allDimCalculee[8][3];

		TweenLite.from($(Balise_texteHaut), 1, {alpha:0,ease:"Sine.easeInOut",delay:0});
		TweenLite.from($(Balise_texteCentre), 1, {alpha:0,ease:"Sine.easeInOut",delay:1});
		TweenLite.from($(Balise_texteBas), 1, {alpha:0,ease:"Sine.easeInOut",delay:0.6});
		
		TweenLite.to($(Balise_Sup), 1, {height:0,ease:"Sine.easeInOut",
				onComplete:function()
				{
					var class_field = $(Balise_Rideau).attr("class");
					$(Balise_Rideau).removeClass(class_field);
					var new_class_field = class_field.replace("VU","NVU");
					$(Balise_Rideau).attr("class",new_class_field);
				}
			});
		TweenLite.to($(Balise_Inf), 1, {height:0,top:2*Hc_vollet2+PYc_Image,ease:"Sine.easeInOut"});
		
		//$('body').click(function() {
			//alert('clicktag')
		 //});	
	}
/////////////////////////////////////////////////
/////////////////////////////////////////////////
	var Balise_Pub = "#publicite";
	var Balise_Dbug = "#dbug";
	var Balise_monImage = Balise_Pub+">.monImage";
	var Balise_texteHaut = Balise_Pub+">.monTexte_haut";
	var Balise_texteCentre = Balise_Pub+">.monTexte_centre";
	var Balise_texteBas = Balise_Pub+">.monTexte_bas";
	var Balise_texteSearch = Balise_Pub+">.maSearch";
	
	var Balise_Rideau = "#rideau";
	var Balise_Sup = "#rideau>.rideau_sup";
	var Balise_Inf = "#rideau>.rideau_inf";
/////////////////////////////////////////////////
/////////////////////////////////////////////////
	var L;
	var H;
	var allDimDom;
	var allDimCalculee;
/////////////////////////////////////////////////:
/////////////////////////////////////////////////:

	var allBalise = new Array();
	allBalise.push(Balise_Pub);
	allBalise.push(Balise_monImage);
	allBalise.push(Balise_texteHaut);
	allBalise.push(Balise_texteCentre);
	allBalise.push(Balise_texteBas);
	allBalise.push(Balise_texteSearch);
	allBalise.push(Balise_Rideau);
	allBalise.push(Balise_Sup);
	allBalise.push(Balise_Inf);

	jQuery(document).ready(
		function()
		{
			L = Math.abs($(window).width());
			H = Math.abs($(window).height());
			
			Extraction_Valeur("init");
			Build_Publicite("init");
			Build_Image("init");
			Build_TexteHaut("init");
			Build_TexteCentre("init");
			Build_TexteBas("init");
			Build_TexteSearch("init");
			Build_Rideau("init");
			Build_Vollets("init");
			Animation("init");
			
		}
	);
	
	//Redimenssionnement
	$(window).resize(
		function()
		{
			L = Math.abs($(window).width());
			H = Math.abs($(window).height());
			
			Build_Publicite("resize");
			Build_Image("resize");
			Build_TexteHaut("resize");
			Build_TexteCentre("resize");
			Build_TexteBas("resize");
			Build_TexteSearch("resize");
			Build_Rideau("resize");
			Build_Vollets("resize");
		}
	);
/////////////////////////////////////////////////:
/////////////////////////////////////////////////: