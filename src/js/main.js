$(document).ready(function() {

	$('.card_block, .card_footer a').hover(function() {
		$(this).parents('.card').addClass('card_hover');
	}, function() {
		$(this).parents('.card').removeClass('card_hover')
	});

	$('.card_block, .card_footer a').click(function() {
		$(this).parents('.card').removeClass('card_hover');
		$(this).parents('.card').toggleClass('card_selected');
		$(this).parents('.card').next('.card-caption').text('Печень утки разварная с артишоками.')
	});

	$('.card_selected').hover(function() {
		console.log('true');
		$(this).find('.card_pre').text('Котэ не одобряет?');
	}, function() {
		$(this).find('.card_pre').text('Сказочное заморское яство');
	});

	$('.card.card_selected').hover(function() {
		$(this).childern('.card-pretitle').text('asdasd')
	}, function() {
		$(this).removeClass('hover')
	});
});