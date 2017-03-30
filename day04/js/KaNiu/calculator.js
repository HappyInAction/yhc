// calculator
function calculator(minmoney, maxmoney, six, nine, twelve){
	var jkMoney = $(".jeinput").val(),
		qxMoney = $("#qxselect option:selected").val(),
		lxMoney = $("#displayDay"),
		hkMoney = $("#displayCalculation"),
		rate,
		yfthValue;
	if( isNaN($(".jeinput").val()) ){
		$(".modal01").css("display", "block");
		$(".jeinput").val(minmoney);
	} else if( $(".jeinput").val()<minmoney || $(".jeinput").val() >maxmoney ){
		$(".modal01").css("display", "block");
		$(".jeinput").val(minmoney);
	} else{
		var BJmoney = Math.round(jkMoney/qxMoney*100)/100;
		$("#displayPrice").html(BJmoney);
		if(qxMoney==6){
			rate = six;
		} else if(qxMoney==9){
			rate = nine;
		}
		 else if(qxMoney==12){
			rate = twelve;
		}
		yfthValue = (jkMoney * rate / 2);
		lxMoney.html(Math.round(yfthValue*100)/100)
		hkMoney.html(Math.round(yfthValue*100)/100);			
	}
	$(".jeinput").focusout(function() {
		calculator(minmoney, maxmoney, six, nine, twelve)
	});
	$(".jeinput,#qxselect").bind('change',function(){
		calculator(minmoney, maxmoney, six, nine, twelve)
	});
}
