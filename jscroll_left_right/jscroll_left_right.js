 
$.fn.extend ({
	jscroll_left_right : function (para){
		para=para || {each_move_items:1,visible_items:6,btn_width:35,btn_height:35,btn_left:'jscroll_left_right/scroll_arrow_left.png',btn_right:'jscroll_left_right/scroll_arrow_right.png',animate_move:false};
		var $this=$(this);
		var visible_content_id='visible_content';
		var height_content=$this.height();
		var width_content=$this.width();
		var width_btn=para.btn_width;
		var height_btn=para.btn_height;

		var padding_btn=(height_content-height_btn)/2;

		var children=$this.children();
		//if(children.length <= para.visible_items) return false;
		var item_children=children.first();
		var item_width=item_children.width();
		var item_width_margin_r=item_children.css('margin-right');
		var item_width_margin_l=item_children.css('margin-left');
		item_width_margin_r=item_width_margin_r.replace('px','');
		item_width_margin_l=item_width_margin_l.replace('px','');
		item_width_margin=item_width_margin_r*1 + item_width_margin_l*1;

		//var width_visible=width_content-width_btn*2-20;
		var width_visible=para.visible_items*(item_width*1+item_width_margin*1)-item_width_margin*1;

		var btn_left = '<div id="btn_left" style="float:left;margin:0 10px 0 0;cursor:pointer;middle;width:'+width_btn+'px;padding:'+padding_btn+'px 0;"><img src="'+para.btn_left+'" ></div>';

		var btn_right = '<div id="btn_right" style="float:left;margin:0 0 0 10px;cursor:pointer;width:'+width_btn+'px;padding:'+padding_btn+'px 0;"><img src="'+para.btn_right+'"></div>';

		var result_all=''+btn_left+'<div style="float:left;width:'+width_visible+'px;overflow:hidden;"><div id="'+visible_content_id+'" style="width:1000000px;">'+$this.html()+'</div></div>'+btn_right+'';
		$this.html(result_all);

		var $btn_left=$this.find("#btn_left");
		var $btn_right=$this.find("#btn_right");

		$btn_left.bind("click",function(e){
			if(para.animate_move==true){
				move_left();
			}else{
				move_left_multiple(para.each_move_items);
			}
		});

		$btn_right.bind("click",function(e){
			if(para.animate_move==true){
				move_right();
			}else{
				move_right_multiple(para.each_move_items);
			}
		});
		function move_left_multiple(n){
			for (i=0;i<n ;i++ )
			{
				var move_one=$this.find("#"+visible_content_id).children().last();
				$this.find("#"+visible_content_id+"").animate({marginLeft: '-='+item_width}, 0,function(){
					$this.find("#"+visible_content_id).children().first().before(move_one);
				});
			}
			//$("#"+visible_content_id+":not(:animated)").animate({marginLeft: '+='+item_width*n}, "slow");
			$this.find("#"+visible_content_id+":not(:animated)").animate({marginLeft: '+='+item_width*n}, 0);
		}
		function move_right_multiple(n){
			for (i=0;i<n ;i++ )
			{
				var move_one=$this.find("#"+visible_content_id).children().first();
				$this.find("#"+visible_content_id+"").animate({marginLeft: '+='+item_width}, 0,function(){
					$this.find("#"+visible_content_id).children().last().after(move_one);
					//$("#"+visible_content_id).css('margin-left',0);
				});
			}
			//$("#"+visible_content_id+"").animate({marginLeft: '-='+item_width*n},"slow");
			$this.find("#"+visible_content_id+"").animate({marginLeft: '-='+item_width*n},0);
		}
		function move_left(){
			var move_one=$this.find("#"+visible_content_id).children().last();
			$this.find("#"+visible_content_id+":not(:animated)").animate({marginLeft: '-='+item_width}, 0,function(){
				$this.find("#"+visible_content_id).children().first().before(move_one);
			});
			$this.find("#"+visible_content_id+":not(:animated)").animate({marginLeft: '+='+item_width}, "slow");
		}
		function move_right(){
			var move_one=$this.find("#"+visible_content_id).children().first();
			$this.find("#"+visible_content_id+":not(:animated)").animate({marginLeft: '-='+item_width}, "slow",function(){
				$this.find("#"+visible_content_id).children().last().after(move_one);
				$this.find("#"+visible_content_id).css('margin-left',0);
			});
		}
	}
});
