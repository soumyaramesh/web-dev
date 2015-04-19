<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset='utf-8' />

<title>My Home Page</title>
    
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">

   nav {
    width: 100%;
    
    
}

   

/*Style for dropdown links*/

   
    nav ul.master_navigation
    {
        font-size: 90%;
        font-family:'Lucida Fax';
        font-weight: bold;
        text-align: center;
        
        margin: 0.5em 0;
        padding: 0;
        border-radius:20px;
        border-color:#FFFF66;
        background-color:black;
       
 

        
    }

    nav ul.master_navigation li
    {
        display: inline-block;
        padding: 0 0.5%;
         border-left: 1px solid #4DAD6D;
        border-right: 1px solid #4DAD6D;
        border-top:1px solid #4DAD6D;
        border-bottom:1px solid #4DAD6D;
        box-sizing: border-box;
        border-color:#4DAD6D;
       
        
    }

    a
    {   
        display: block;
        color: #B6CEFF;
        font-weight: bold;
        text-decoration: none;
    }

    a:visited
    {
        color: #B6CEFF;
    }

    a:hover
    {
        color: #f00;
    }

    p
    {
        text-align: justify;
    }

    h1
    {
        text-align: center;
        color:#FFFFB2;
    }

    img
    {
        display: block;
        margin-left: auto;
        margin-right: auto;
        border-radius:200px; 
        width:35%; 
        height:35%; 
        
    }

    p
    {
        text-align:center;
    }

    html { 
			background: url("http://static.wallpedes.com/wallpaper/wallpapers/wallpapers-for-gt-dark-blue-pattern-wallpaper-dark-pattern-wallpaper-hd-wallpapers-android-for-mobile-free-download-1920x1080-background-iphone-5-desktop.jpg") no-repeat center center fixed; 
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
			background-size: cover;
		
    }  
    
    .show-menu {
	font-family: Calibri, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size:x-large;
	text-decoration: none;
	color: #fff;
	background: #4DDBB8;
	text-align: center;
	padding: 10px 0;
	display: none;
}

    /*Hide checkbox*/
input[type=checkbox]{
    display: none;
}

/*Show menu when invisible checkbox is checked*/
input[type=checkbox]:checked ~ #menu{
    display: block;
}

@media only screen and (max-width : 760px){
	/*Make dropdown links appear inline*/
	ul {
		position: static;
		display: none;
	}
	/*Create vertical spacing*/
	li {
		margin-bottom: 1px;
	}
	/*Make all menu links full width*/
	ul li, li a {
		width: 100%;
	}
	
	.show-menu {
		display:block;
	}
}
  
</style>

<style type="text/css" media="screen">
    

    

    

    body {
        width:100%;
        max-width: 100%;
        margin: 0;
        padding: 0;
    }

    .pad {
        padding: 10px;
    }

    nav > ul > li {
		display: block;	
	}

    header {
			height: auto;
			position: relative;
			width: 100%;
		}
</style>

</head>

<body>

<h1 style="font-family:'Lucida Sans'"> Soumya Ramesh </h1>
    <hr />

<div class="pad">

<form id="form1" runat="server">

<div>
 
<header>    
<nav>
    <label for="show-menu" class="show-menu">Menu</label>
	<input type="checkbox" id="show-menu" role="button">
    
<ul class="master_navigation" id="menu">
    <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
    <li><a href="statistics/" target="_blank">Statistics</a></li>
    <li><a href="source/" target="_blank">Source</a></li>
    <li><a href="search/" target="_blank">Search</a></li>
    <li><a href="searchtree/" target="_blank">SearchTree</a></li>
    <li><a href="textview/" target="_blank">TextView</a></li>
    <li><a href="filelist.aspx" target="_blank">FileList</a></li>
    <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
    <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
    <li><a href="blog/" target="_blank">Blog</a></li>
    <li><a href="experiments/" target="_blank">Experiments</a></li>
    <li><a href="project/" target="_blank">Project</a></li>
</ul>
    </nav>
       
</header>  



<hr />
  
    <div class="circular">
<img src="images/home_page/soumya.jpg" >
      </div>   

<hr />

<p style="color:floralwhite; font-family:'Lucida Calligraphy','Lucida Handwriting',Calibri; background-color:black; border-radius:16px;">
Hi I'm Soumya Ramesh. Welcome to my home page. I'm a gradute student in Computer Science at Northeastern University. Here's the link to my Git page containing my experiments and projects for this course. <br />
    <a href="https://github.com/soumyaramesh/web-dev">Github</a>
</p>

    
<hr />

</div>

</form>

   

</div>

</body>
</html>
