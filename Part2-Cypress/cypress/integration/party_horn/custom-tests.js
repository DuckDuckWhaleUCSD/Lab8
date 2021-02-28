describe('Party Horn Tests', () => {
	beforeEach(() => {
		cy.visit('http://127.0.0.1:5500/');
	});

	it('First Test', () => {
		expect(true).to.equal(true);
	});

	it('Slider changes when volume input changes', () => {
		cy.get('#volume-number').clear().type('75');
		cy.get('#volume-slider').then($el => {
			expect($el).to.have.value(75);
		});
	});

	it('Volume input changes when slider changes', () => {
		cy.get('#volume-slider').invoke('val', 33).trigger('input');
		cy.get('#volume-number').then($el => {
			expect($el).to.have.value(33);
		});
	});

	it('Volume of <audio> changes when we change value of slider', () => {
		cy.get('#volume-slider').invoke('val', 33).trigger('input');
		cy.get('#horn-sound').then($el => {
			expect($el).to.have.prop('volume', 0.33);
		});
	});

	it('Image and sound sources change when party horn radio button is selected', () => {
		cy.get('#radio-party-horn').click();
		cy.get('#sound-image').then($el => {
			expect($el).to.have.prop('src').and.satisfy(src => src.endsWith('/assets/media/images/party-horn.svg'));
		});
		cy.get('#horn-sound').then($el => {
			expect($el).to.have.prop('src').and.satisfy(src => src.endsWith('/assets/media/audio/party-horn.mp3'));
		});
	});

	it('Volume image changes when increasing volumes', () => {
		cy.get('#volume-slider').invoke('val', 0).trigger('input');
		cy.get('#volume-image').then($el => {
			expect($el).to.have.prop('src').and.satisfy(src => src.endsWith('/assets/media/icons/volume-level-0.svg'));
		});
		cy.get('#volume-slider').invoke('val', 1).trigger('input');
		cy.get('#volume-image').then($el => {
			expect($el).to.have.prop('src').and.satisfy(src => src.endsWith('/assets/media/icons/volume-level-1.svg'));
		});
		cy.get('#volume-slider').invoke('val', 34).trigger('input');
		cy.get('#volume-image').then($el => {
			expect($el).to.have.prop('src').and.satisfy(src => src.endsWith('/assets/media/icons/volume-level-2.svg'));
		});
		cy.get('#volume-slider').invoke('val', 67).trigger('input');
		cy.get('#volume-image').then($el => {
			expect($el).to.have.prop('src').and.satisfy(src => src.endsWith('/assets/media/icons/volume-level-3.svg'));
		});
	});

	it('Honk button is disabled when textbox input is empty or non-number', () => {
		cy.get('#volume-number').invoke('val', '').trigger('input');
		cy.get('#honk-btn').then($el => {
			expect($el).to.be.disabled;
		});
		cy.get('#volume-number').invoke('val', '1').trigger('input');
		cy.get('#honk-btn').then($el => {
			expect($el).to.be.enabled;
		});
		cy.get('#volume-number').invoke('val', 'lol').trigger('input');
		cy.get('#honk-btn').then($el => {
			expect($el).to.be.disabled;
		});
	});

	it('Error is shown when typing a number outside of volume textbox range', () => {
		cy.get('#volume-number').invoke('val', '101').trigger('input');
		cy.get('#volume-number:invalid').then($el => {
			expect($el).to.exist;
		});
	});
});
