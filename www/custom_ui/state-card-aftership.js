class StateCardAftershipLL extends HTMLElement {  
  _getShipmentCount(hass)
  {
	const entityId = this.config.entity;
	return hass.states[entityId].attributes.data.count;
  }
  
  _getShipments(hass) {
	  const entityId = this.config.entity;
	  const entries = hass.states[entityId].attributes.data.trackings;
	  
	  var shipments = ``;
	  
	  for (var i = 0; i < entries.length; i++) { 
		  const shipmentEntry = `<td>` + entries[i].title + `</td>` + `<td>` + entries[i].tag + `</td>` + `<td>` + entries[i].tracking_number + `</td>`;
		  shipments += `<tr>` + shipmentEntry + `</tr>`;
	  }
	  return shipments;
	  
  }
  
  _updateTrackings(element, attributes)
  {
	  element.innerHTML =``;
  }
   
  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }
  
    set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = 'AfterShip';
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      card.appendChild(this.content);
      this.appendChild(card);
	  
	  const shipmentCount = this._getShipmentCount(hass);
	  const shipments = this._getShipments(hass);
	  this.content.innerHTML = `<small><a href="https://secure.aftership.com/#/dashboard" target="_blank">Aftership Dashboard</a></small><br>
		<b>Tracking: </b>${shipmentCount} items
		<table style="width:100%">
		 <thead>
		  <tr>
			<th>Item</th>
			<th>Status</th> 
			<th>Tracking Number</th>
		  </tr>
		 </thead>
		 <tbody id='trackings'>`
		 + shipments +
		 `</tbody>
		</table>`;
    }
	const root = this.shadowRoot;	
		
	
	//console.log(this.content.getElementById('trackings'));
	//this._updateTrackings(root.getElementById('trackings'), shipments);
	
  }

  getCardSize() {
    return 1;
  }
}

customElements.define('state-card-aftership-ll', StateCardAftershipLL);