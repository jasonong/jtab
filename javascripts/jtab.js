/**
 * JTab - Javascript/CSS Guitar Chord and Tab Notation for the Web.
 * Version 1.0
 * Written by Paul Gallagher (http://tardate.com), 2009.
 * See:
 *   http://jtab.tardate.com : more information on availability, configuration and use.
 *   http://github.com/tardate/jtab/tree/master : source code repository, wiki, documentation
 *
 * This library also depends on the following two libraries that must be loaded for it to work:
 *   prototype - http://www.prototypejs.org/
 *   Rapha�l - http://raphaeljs.com/
 *
 *
 * This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General 
 * Public License as published by the Free Software Foundation; either version 2.1 of the License, or (at your option) 
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied 
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more 
 * details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with this library; if not, write to 
 * the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA 
 */

//
// define the jtab class
//

var jtab = {
  Version : '1.0',
  Strings : {
  	AboutDialog : '<html><head><title>About jTab</title></head><body style=""><p style="">jTab version: {V}</p><p><a href="http://jtab.tardate.com" target="_blank">http://jtab.tardate.com</a></p><p><input type="button" class="close" value="OK" onClick="window.close()"/></p></body></html>'
  },
  Chords : {
             // chord data - currently explicit representation for 6 string guitar, standard tuning only, and 
             // each chord is an array of alternate positions, currently only 1st position used
             // each position is an array comprising: 1. base fret (1==nut); 2. 6x note definitions (strings 6,5,4,3,2,1)
             // each note is an array: (fret position), (left hand fingering if applicable 1,2,3,4,T)
             // fret position: -1 = muted/not played; 0 = open; 1,2,3... = fret position
      
    C      : [ [ 1, [-1 ],  [3,4],  [2,3],  [0  ],  [1,2],  [0  ] ], [  ] ],
    C6     : [ [ 1, [-1 ],  [0  ],  [2,2],  [2,3],  [1,1],  [3,4] ], [  ] ],
    Cm6    : [ [ 1, [-1 ],  [-1 ],  [1,1],  [2,3],  [1,2],  [3,4] ], [  ] ],
    Cm     : [ [ 1, [-1 ],  [3,4],  [1,2],  [0  ],  [1,1],  [-1 ] ], [  ] ],
    Cmaj7  : [ [ 1, [-1 ],  [3,4],  [2,3],  [0  ],  [0  ],  [0  ] ], [  ] ],
    Cm7    : [ [ 1, [-1 ],  [-1 ],  [1,1],  [3,3],  [1,1],  [3,4] ], [  ] ],
    C7     : [ [ 1, [-1 ],  [3,3],  [2,2],  [3,4],  [1,1],  [0  ] ], [  ] ],
    Cadd9  : [ [ 1, [-1 ],  [3,2],  [2,1],  [0  ],  [3,3],  [0  ] ], [  ] ],
    Csus2  : [ [ 1, [ -1],  [3,1],  [5,3],  [5,4],  [3,1],  [3,1] ], [  ] ],
    Csus4  : [ [ 1, [ -1],  [3,1],  [5,2],  [5,3],  [6,4],  [3,1] ], [  ] ],
    Cdim   : [ [ 1, [-1 ],  [3,3],  [4,4],  [2,2],  [1,1],  [-1 ] ], [  ] ],

    A      : [ [ 1, [-1],  [0  ],  [2,2],  [2,1],  [2,3],  [0  ] ], [  ] ],
    A6     : [ [ 1, [-1],  [0  ],  [2,1],  [2,1],  [2,1],  [2,1] ], [  ] ],
    Am6    : [ [ 1, [-1],  [0  ],  [2,2],  [2,3],  [1,1],  [2,4] ], [  ] ],
    Am     : [ [ 1, [-1],  [0  ],  [2,2],  [2,3],  [1,1],  [0  ] ], [  ] ],
    Amaj7  : [ [ 1, [-1],  [0  ],  [2,3],  [1,2],  [2,4],  [0  ] ], [  ] ],
    Am7    : [ [ 1, [-1],  [0  ],  [2,2],  [0  ],  [1,1],  [0  ] ], [  ] ],
    A7     : [ [ 1, [-1],  [0  ],  [2,2],  [0  ],  [2,3],  [0  ] ], [  ] ],
    Asus2  : [ [ 1, [-1],  [0  ],  [2,1],  [2,2],  [0  ],  [0  ] ], [  ] ],
    Asus4  : [ [ 1, [-1],  [0  ],  [2,1],  [2,2],  [3,3],  [0  ] ], [  ] ],
    Adim   : [ [ 1, [-1],  [0  ],  [1,1],  [2,3],  [1,2],  [-1 ] ], [  ] ],
    Aaug   : [ [ 1, [-1],  [0  ],  [3,4],  [2,2],  [2,3],  [1,1] ], [  ] ],

    G      : [ [ 1, [3,3],  [2,2],  [0  ],  [0  ],  [0  ],  [3,4] ], [  ] ],
    G6     : [ [ 1, [3,3],  [2,2],  [0  ],  [0  ],  [0  ],  [0  ] ], [  ] ],
    Gm6    : [ [ 1, [-1 ],  [-1 ],  [2,1],  [3,3],  [3,3],  [3,3] ], [  ] ],
    Gm     : [ [ 1, [2,3],  [1,1],  [0  ],  [0  ],  [3,3],  [3,4] ], [  ] ],
    Gmaj7  : [ [ 1, [3,4],  [2,3],  [0  ],  [0  ],  [0  ],  [2,2] ], [  ] ],
    Gm7    : [ [ 1, [-1 ],  [1,1],  [3,3],  [0  ],  [3,4],  [-1 ] ], [  ] ],
    G7     : [ [ 1, [3,3],  [2,2],  [0  ],  [0  ],  [0  ],  [1,1] ], [  ] ],
    Gsus2  : [ [ 1, [-1 ],  [0  ],  [0  ],  [0  ],  [1,1],  [1,1] ], [  ] ],
    Gsus4  : [ [ 2, [3,1],  [5,2],  [5,3],  [5,4],  [3,1],  [3,1] ], [  ] ],
    Gaug   : [ [ 1, [3,1],  [-1 ],  [5,4],  [4,2],  [4,3],  [3,1] ], [  ] ],

    E      : [ [ 1, [ 0 ],  [2,2],  [2,3],  [1,1],  [0  ],  [0  ] ], [  ] ],
    E6     : [ [ 1, [ 0 ],  [2,2],  [2,3],  [1,1],  [2,4],  [0  ] ], [  ] ],
    Em6    : [ [ 1, [ 0 ],  [2,1],  [2,2],  [0  ],  [2,3],  [0  ] ], [  ] ],
    Em     : [ [ 1, [ 0 ],  [2,2],  [2,3],  [0  ],  [0  ],  [0  ] ], [  ] ],
    Emaj7  : [ [ 1, [ 0 ],  [2,4],  [1,2],  [1,3],  [0  ],  [0  ] ], [  ] ],
    Em7    : [ [ 1, [ 0 ],  [2,2],  [2,3],  [0  ],  [3,4],  [0  ] ], [  ] ],
    E7     : [ [ 1, [ 0 ],  [2,2],  [0  ],  [1,1],  [0  ],  [0  ] ], [  ] ],
    Esus2  : [ [ 1, [ -1],  [2,1],  [4,3],  [4,4],  [-1 ],  [0  ] ], [  ] ],
    Esus4  : [ [ 1, [ 0 ],  [2,2],  [2,3],  [2,4],  [0  ],  [0  ] ], [  ] ],
    Edim   : [ [ 1, [-1],  [1,1],  [2,2],  [3,4],  [2,3],  [-1 ] ], [  ] ],
    Eaug   : [ [ 1, [ 0 ],  [3,4],  [2,3],  [1,1],  [1,2],  [0 ] ], [  ] ],

    D      : [ [ 1, [-1 ],  [0  ],  [0  ],  [2,1],  [3,3],  [2,2] ], [  ] ],
    D6     : [ [ 1, [-1 ],  [0  ],  [0  ],  [2,2],  [0  ],  [2,3] ], [  ] ],
    Dm6    : [ [ 1, [-1 ],  [2,2],  [0  ],  [2,3],  [0  ],  [1,1] ], [  ] ],
    Dm     : [ [ 1, [-1 ],  [0  ],  [0  ],  [2,2],  [3,3],  [1,1] ], [  ] ],
    Dmaj7  : [ [ 1, [-1 ],  [0  ],  [0  ],  [2,3],  [2,3],  [2,3] ], [  ] ],
    Dm7    : [ [ 1, [-1 ],  [-1 ],  [0  ],  [2,2],  [1,1],  [1,1] ], [  ] ],
    D7     : [ [ 1, [-1 ],  [0  ],  [0  ],  [2,2],  [1,1],  [2,3] ], [  ] ],
    Dsus2  : [ [ 1, [-1 ],  [-1 ],  [0  ],  [2,1],  [3,3],  [0  ] ], [  ] ],
    Dsus4  : [ [ 1, [-1 ],  [-1 ],  [0  ],  [2,1],  [3,3],  [3,4] ], [  ] ]

  },
  WesternScale: {
    BaseNotes:  {
      'C' : 'C',
      'C#': 'C#',
      'Db': 'C#',
      'D' : 'D',
      'D#': 'Eb',
      'Eb': 'Eb',
      'E' : 'E',
      'F' : 'F',
      'F#': 'F#',
      'Gb': 'F#',
      'G' : 'G',
      'G#': 'G#',
      'Ab': 'G#',
      'A' : 'A',
      'A#': 'Bb',
      'Bb': 'Bb',
      'B' : 'B'  
    },
    BaseIntervals: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
  }
};


//
// define jtabChord class
//

var jtabChord = Class.create({
  initialize: function(token) {
    this.scale = jtab.WesternScale;
    this.baseNotes = this.scale.BaseNotes;
    this.chordArray = null;
    this.chordName = '';
    this.baseChords = jtab.Chords;
    this.isValid = false;
    this.isCaged = false;
    this.cagedPos = 1;
    this.cagedName = '';
    
    if ( token.match( /:/ ) != null ) {
      var parts = token.split(':');
      this.chordName = parts[0];
      this.rootNote = this.baseNotes[this.chordName.match(/^.#|^.b|^./)[0]];
      this.cagedPos = parts[1]; 
      if ( this.cagedPos > 0 ) {
        this.isValid = true;
        this.isCaged = true;
        this.setCagedChordArray();
      }
    } else {
      this.chordName = token;
      this.rootNote = this.baseNotes[this.chordName.match(/^.#|^.b|^./)[0]];
      this.cagedPos = "CAGED".indexOf(this.rootNote) + 1;
      var rn = jtab.WesternScale.BaseNotes[this.rootNote];
      if (rn == 'C#' || rn == 'Eb' || rn == 'Bb' || rn == 'B') {
        this.cagedPos = 2;
      } 
      else if (rn == 'F' || rn == 'F#' || rn == 'G#') {
        this.cagedPos = 4;
      };
      this.isValid = true;
      this.isCaged = false;
      this.setCagedChordArray();
    }
  },
  setCagedChordArray: function() {

    this.cagedNote = "CAGED".charAt( this.cagedPos - 1 );

    // get CAGED chord by replacing rootnote of actual chord
    this.cagedName = this.chordName.replace(/^.#|^.b|^./, this.cagedNote); 

    var caged_index = "CAGED".indexOf(this.chordName) + 1; // get 1-based index
    var fret_widths = [3,2,3,2,2];

        
    var starting_fret = 0;

    for (var i = 1; i < this.cagedPos ; i++) {
      var index = (caged_index - 1) % 5;
      caged_index  = ( caged_index >= 5) ? 1 : caged_index + 1;
      starting_fret += fret_widths[index];
    }
    if (starting_fret < 1) starting_fret = 1;
    
    //alert( caged_index + ' ' + starting_fret);
    this.setChordArray();
    this.shiftChordArray();
  },
  setChordArray: function() { // clones chord array (position 1) from chord ref data into this object
    this.chordArray = new Array();

    if (jtab.Chords[this.cagedName] === undefined ) {
      this.isValid = false;
      return;
    }
    
    var modelRef = jtab.Chords[this.cagedName][0];
    this.chordArray[0] = modelRef[0]
    for (var i = 1; i < modelRef.length ; i++) {
      this.chordArray[i] = modelRef[i].clone();  
    }   
  },
  shiftChordArray: function() { // shift chord to new fret position

    // calculate number of intervals between base CAGED chord and actual chord
    var cagedChordArray = this.chordArray;
    var cagedChordRootNote = "CAGED".charAt( this.cagedPos - 1 );
    var cagedChordStartFret = this.chordArray[0];
    var cagedChordIntervalicFretPosition = jtab.WesternScale.BaseIntervals.indexOf(cagedChordRootNote);

    var noteIntervals = jtab.WesternScale.BaseIntervals.clone();
    var noteIntervalsRebased = [];
    var notesShifted = [];
    for (var i = 0; i < cagedChordIntervalicFretPosition; i++) {
      notesShifted.push(noteIntervals.shift());
    }

    noteIntervalsRebased = noteIntervals.concat(notesShifted); // get scale intervals starting with rootnote of actual chord

    var actualChordRootNote = jtab.WesternScale.BaseNotes[this.rootNote];
    var actualChordIntervalicFretPosition = noteIntervalsRebased.indexOf(actualChordRootNote);
    var intervalicDifference = actualChordIntervalicFretPosition;
    var actualChordStartFret = cagedChordStartFret + intervalicDifference;

    for (var i = 1; i < this.chordArray.length ; i++) {
      var fret = (cagedChordArray[i][0] >= 0 ) ? cagedChordArray[i][0] + intervalicDifference : cagedChordArray[i][0];
      var finger = cagedChordArray[i][1] === undefined ? 1 : cagedChordArray[i][1];
      this.chordArray[i] = [ fret ,  finger ];  
    }

    this.chordArray[0] = cagedChordArray[0] + intervalicDifference - 1;

  }
});




//
// define extensions to the Raphael class
//
  
Raphael.fn.tabtype = 0;  // 0 = none, 1 = tab & chord, 2 = chord, 3 = tab
Raphael.fn.has_chord = false;
Raphael.fn.has_tab = false;

Raphael.fn.debug = false;
Raphael.fn.scale = 1; 
Raphael.fn.margin_top = 36;
Raphael.fn.margin_bottom = 10;
Raphael.fn.margin_left = 16;
Raphael.fn.margin_right = 10;

Raphael.fn.current_offset = Raphael.fn.margin_left;

Raphael.fn.string_spacing = 16;
Raphael.fn.strings_drawn = 6;
Raphael.fn.fret_spacing = 16;
Raphael.fn.frets_drawn = 4;
Raphael.fn.note_radius = 7;

Raphael.fn.fret_width = Raphael.fn.string_spacing * ( Raphael.fn.strings_drawn - 1 ); 
Raphael.fn.fret_height = Raphael.fn.fret_spacing * (Raphael.fn.frets_drawn + 0.5); 
Raphael.fn.chord_width = Raphael.fn.margin_left + Raphael.fn.fret_width + Raphael.fn.string_spacing + Raphael.fn.margin_right; 
Raphael.fn.chord_height = Raphael.fn.margin_top + Raphael.fn.fret_height + Raphael.fn.margin_bottom;

Raphael.fn.tab_current_string = 0; // 1,2,3,4,5,6 or 0 = not set
Raphael.fn.tab_margin_top = 10;
Raphael.fn.tab_top = Raphael.fn.chord_height + Raphael.fn.tab_margin_top;
Raphael.fn.tab_spacing = Raphael.fn.fret_spacing;
Raphael.fn.tab_height = Raphael.fn.tab_spacing * 5;
Raphael.fn.tab_char_width = 8;

Raphael.fn.total_height = Raphael.fn.tab_top + Raphael.fn.tab_height + Raphael.fn.margin_bottom;

Raphael.fn.color = "#000";
Raphael.fn.note_text_color = "#fff";
Raphael.fn.tab_text_color = "#000";


// debug helper - puts grid marks on the rendered image
Raphael.fn.debug_grid = function (width) {
  // h ticks
  this.path({stroke: this.color, "stroke-width":0.2 }).relatively().moveTo(
    this.current_offset, 0).lineTo(0, 4);
  this.path({stroke: this.color, "stroke-width":0.2 }).relatively().moveTo(
    this.current_offset + this.margin_left, 0).lineTo(0, 2);
  this.path({stroke: this.color, "stroke-width":0.2 }).relatively().moveTo(
    this.current_offset + width - this.margin_right, 0).lineTo(0, 2);
  // v ticks
  if (this.tabtype == 3) {
    this.path({stroke: this.color, "stroke-width":0.2 }).relatively().moveTo(
      this.current_offset, this.tab_margin_top).lineTo(2, 0);
  } else {
    this.path({stroke: this.color, "stroke-width":0.2 }).relatively().moveTo(
      this.current_offset, this.margin_top).lineTo(2, 0);
  }
}


// step the current position for drawing
Raphael.fn.increment_offset = function (width) {
  w = ( width === undefined ) ? this.chord_width : width;
  if (this.debug) this.debug_grid(w);
  this.current_offset += w;
  this.setSize( this.current_offset, this.total_height );
}


// draw the fretboard
Raphael.fn.chord_fretboard = function ( position, chord_name ) {
  var fret_left = this.current_offset + this.margin_left;
  var fret_labels = [ '', '', '', 'III', '', 'V', '', 'VII', '', 'IX', '', '', 'XII', '', '', 'XV', '', 'XVII', '', 'XIX', '', 'XXI', '' ];
  
  this.text( // chord name
    fret_left + 2.5 * this.string_spacing,
    this.margin_top - 20, 
    chord_name).attr({stroke: this.color, "font-size":"20px"});
  
  if ( position == 1 ) { // nut
    this.path({stroke: this.color, "stroke-width":3 }).relatively().moveTo(
      fret_left, this.margin_top).lineTo(this.string_spacing * (this.strings_drawn - 1), 0);
  } else {
    this.path({stroke: this.color, "stroke-width":1 }).relatively().moveTo(
      fret_left, this.margin_top).lineTo(this.string_spacing * (this.strings_drawn - 1), 0);
  }
  for (var i = 1; i <= this.frets_drawn; i++ ) { // frets
    this.path({stroke: this.color}).relatively().moveTo(
      fret_left, 
      this.margin_top + (i * this.fret_spacing) ).lineTo(this.string_spacing * (this.strings_drawn - 1), 0 );

    pos = ( fret_labels[ position - 1 + i ] === undefined ) ? '' : fret_labels[ position - 1 + i ];

    if ( pos.length > 0 ) { // draw fret position
      this.text(
        fret_left + this.fret_width + this.string_spacing * 1.0, 
        this.margin_top + ( ( i - 0.5 ) * this.fret_spacing), 
        pos).attr({stroke: this.color, "font-size":"12px"});
    }
  }
  for (var i = 0; i < this.strings_drawn; i++ ) { // strings
    this.path({stroke: this.color}).relatively().moveTo(
      fret_left + (i * this.string_spacing), 
      this.margin_top).lineTo(0, this.fret_spacing * (this.frets_drawn + 0.5) );
  }
  this.tab_extend(this.chord_width); // extend the tab if present
}


// draw a stroke (/)
Raphael.fn.stroke = function () {

  if (this.has_tab) {
    var width = this.tab_char_width * 3;
    // extend tab
    this.tab_extend(width);
    //  stroke
    this.path({stroke: this.color, "stroke-width":4 }).relatively().moveTo( 
        this.current_offset + this.tab_char_width, 
        this.tab_top  + (3.5 * this.tab_spacing) ).lineTo(
        this.tab_char_width, 
        - 2 * this.tab_spacing );

    this.increment_offset(width);    
  } else if (this.has_chord) {
    var dx = this.string_spacing;
    var dy = 2 * this.fret_spacing;     
    this.path({stroke: this.color, "stroke-width":4 }).relatively().moveTo( 
        this.current_offset + this.margin_left, 
        this.margin_top + this.fret_spacing + dy ).lineTo(
        dx, -dy );
    
    this.increment_offset(  this.margin_left + dx + this.margin_right ); 
  }
}


// draw a bar
Raphael.fn.bar = function () {

  if (this.has_tab) {
    var width = this.tab_char_width * 2;
    // extend tab
    this.tab_extend(width);
    this.path({stroke: this.color, "stroke-width":1 }).relatively().moveTo( //  bar
      this.current_offset + this.tab_char_width, this.tab_top ).lineTo( 0, this.tab_height );
    this.increment_offset(width);    

  } else if (this.has_chord) { 
    var fret_left = this.current_offset + this.margin_left;
    this.path({stroke: this.color, "stroke-width":1 }).relatively().moveTo( 
        this.current_offset + this.margin_left, this.margin_top  ).lineTo(
        0, this.fret_height );
    
    this.increment_offset( this.margin_left + this.margin_right );  
  }
}


// draw double bar
Raphael.fn.doublebar = function () {
  if (this.has_tab) {
    var width = this.tab_char_width + 8;
    // extend tab
    this.tab_extend(width);
    //  bar
    this.path({stroke: this.color, "stroke-width":1 }).relatively().moveTo(
      this.current_offset + this.tab_char_width, this.tab_top ).lineTo( 
      0, this.tab_height );
    this.path({stroke: this.color, "stroke-width":4 }).relatively().moveTo(
      this.current_offset + this.tab_char_width + 6, this.tab_top ).lineTo( 
      0, this.tab_height );
    this.increment_offset(width);    

  } else if (this.has_chord) { 
    var left = this.current_offset + this.margin_left;
    this.path({stroke: this.color, "stroke-width":1 }).relatively().moveTo( 
        left, this.margin_top  ).lineTo(
        0, this.fret_height );
    this.path({stroke: this.color, "stroke-width":4 }).relatively().moveTo( 
        left + 6, this.margin_top  ).lineTo(
        0, this.fret_height );
    
    this.increment_offset( this.margin_left + 6 + this.margin_right );  
  }
}


// draw a note in a chord
Raphael.fn.chord_note = function (position, string_number, note) {
  // NB: internal string_number in chords counts from low to high
  var fret_number = note[0];
  var fret_left = this.current_offset + this.margin_left;
    
  if (fret_number < 0 ) {
    // muted/not played
    this.text(fret_left + (string_number - 1) * this.string_spacing, this.margin_top - 8, "x").attr({stroke: this.color, "font-size":"9px"});
  } else if (fret_number == 0 ) {
    // open
    this.text(fret_left + (string_number - 1) * this.string_spacing, this.margin_top - 8, "o").attr({stroke: this.color, "font-size":"9px"});
  } else {
    var fret_dy = (fret_number - position + 0.5) * this.fret_spacing;
    //var circle = 
    this.circle(
      fret_left + (string_number - 1) * this.string_spacing, 
      this.margin_top + fret_dy, this.note_radius).attr({stroke: this.color, fill: this.color});
    if ( ! (note[1] === undefined) ) {
      this.text( fret_left + (string_number - 1) * this.string_spacing, 
      this.margin_top + fret_dy, note[1] ).attr({stroke: this.note_text_color, "font-size":"12px"});
    }
  }
  
  if ( this.has_tab && fret_number >= 0 ) {
    this.draw_tab_note( (this.strings_drawn - string_number + 1), fret_number, this.margin_left + this.string_spacing * 2.5 ); 
  }
}


// extend the tab drawing area
Raphael.fn.tab_extend = function (width) {
  if (this.has_tab == false) return;
  for (var i = 0; i < this.strings_drawn; i++ ) {
    this.path({stroke: this.color}).relatively().moveTo(this.current_offset, this.tab_top  + (i * this.tab_spacing) ).lineTo( width, 0 );
  }
}


// start the tab
Raphael.fn.tab_start = function () {
  if (this.has_tab == false) return;
  var width = this.tab_char_width * 3;
  //  start bar
  this.path({stroke: this.color, "stroke-width":1 }).relatively().moveTo(this.current_offset, this.tab_top ).lineTo( 0, this.tab_height );
  // extend tab
  this.tab_extend(width);
  //write TAB
  this.text(this.current_offset + this.tab_char_width, this.tab_top + this.tab_spacing * 1.5, "T").attr({stroke: this.color, "font-size":"14px"});
  this.text(this.current_offset + this.tab_char_width, this.tab_top + this.tab_spacing * 2.5, "A").attr({stroke: this.color, "font-size":"14px"});
  this.text(this.current_offset + this.tab_char_width, this.tab_top + this.tab_spacing * 3.5, "B").attr({stroke: this.color, "font-size":"14px"});
  this.increment_offset(width);
}


// draw an individual note in the tab
Raphael.fn.draw_tab_note = function (string_number, token, left_offset) {
  // NB: internal string_number in tab counts from high to low
  this.text(this.current_offset + left_offset, 
          this.tab_top + this.tab_spacing * (string_number - 1), 
          token).attr({stroke: this.color, "font-size":"16px"});
}


// draw a token on the tab
Raphael.fn.tab_note = function (token) {
  if (this.has_tab == false) return;
  
  if ( token.match( /\$/ ) != null ) { // contains a string specifier
    if ( token.match( /\./ ) != null ) { // is a multi-string specifier
      var parts = token.split(".");
      var width = 2;
      for (var i = 0; i < parts.length ; i++) { // get the max length of the multi-string specifiers 
        if ( parts[i].length > width ) width = parts[i].length;
      }
      width *= this.tab_char_width + 1;
      this.tab_extend( width );
      for (var i = 0; i < parts.length ; i++) {
        var part = parts[i];
        if ( part.match( /^\$/ ) != null ) {
          this.tab_current_string = part.substr(1,1); 
        } else if ( this.tab_current_string > 0 )  {
          this.draw_tab_note( this.tab_current_string, part, width * 0.5 );
        }
      }
      this.increment_offset( width );
        
    } else { // just a string setting
      this.tab_current_string = token.substr(1,1);
    }
  } else if ( this.tab_current_string > 0 ) { // else draw literal, but only if a current string selected
    var width = this.tab_char_width * ( token.length + 2 );
    //var left_offset = width * 0.5;
    this.tab_extend( width );
    this.draw_tab_note( this.tab_current_string, token, width * 0.5 ); 
    this.increment_offset( width );
  }
}


// main drawing routine entry point: to render a token - chord or tab
Raphael.fn.render_token = function (token) {
  var c = new jtabChord(token);

  if ( c.isValid ) { // draw chord
    var chord = c.chordArray;
    this.chord_fretboard(chord[0], c.chordName );
    for (var i = 1; i < chord.length ; i++) {  
      this.chord_note(chord[0], i, chord[i]);
    }
    this.increment_offset();

  } else {
    if (token == "/" ) {
      this.stroke();
    } else if (token == "|" ) {
      this.bar();
    } else if (token == "||" ) {
      this.doublebar();
    } else if ( this.has_tab ) {
      this.tab_note( token );
    }
    
  }
}


//
// add jtab class methods
//


// determine nature of the token stream
jtab.characterize = function (notation) {
  var tabtype = 0;
  var gotChord = ( notation.match( /[A-G]/ ) != null );
  var gotTab = ( notation.match( /\$/ ) != null );
  // set defaults - apply scaling here (TODO)
  Raphael.fn.current_offset = Raphael.fn.margin_left;
  if ( gotChord && gotTab ) { // chord and tab
    tabtype = 1;
    Raphael.fn.has_chord = true;
    Raphael.fn.has_tab = true;
    Raphael.fn.tab_top = Raphael.fn.chord_height + Raphael.fn.tab_margin_top;
    Raphael.fn.total_height = Raphael.fn.tab_top + Raphael.fn.tab_height + Raphael.fn.margin_bottom;
  } else if ( gotChord ) { // chord only
    tabtype = 2;
    Raphael.fn.has_chord = true;
    Raphael.fn.has_tab = false;
    Raphael.fn.tab_top = Raphael.fn.chord_height + Raphael.fn.tab_margin_top;
    Raphael.fn.total_height = Raphael.fn.chord_height;
  } else if ( gotTab ) { // tab only
    tabtype = 3;
    Raphael.fn.has_chord = false;
    Raphael.fn.has_tab = true;
    Raphael.fn.tab_top = Raphael.fn.tab_margin_top;
    Raphael.fn.total_height = Raphael.fn.tab_top + Raphael.fn.tab_height + Raphael.fn.margin_bottom;
  }
  Raphael.fn.tabtype = tabtype;    
  return tabtype;
}


// main render entry point
jtab.render = function (element,notation) {

  var tabtype = jtab.characterize( notation );
  if (tabtype == 0 ) return;
  
  // add the Raphael canvas in its own DIV. this gets around an IE6 issue with not removing previous renderings
  var canvas_holder = new Element('div').setStyle({height: Raphael.fn.total_height});
  $(element).update(canvas_holder);
  canvas = Raphael(canvas_holder, 80, Raphael.fn.total_height );
  canvas.tab_start();
  
  var tokens = notation.split(/\s/);
  for(var i = 0; i < tokens.length; i++) {
    canvas.render_token(tokens[i]);
  }
}


// process implicit rendering of tags with class 'jtab'
jtab.renderimplicit = function() {
  $$('.jtab').each( function(name, index) { jtab.render(name,name.innerHTML); } );
}


// initialize jtab - setup to run implicit rendering on window.onload
jtab.init = function() {
  if (typeof window.onload != 'function') {
    window.onload = jtab.renderimplicit;
  } else {
    var oldonload = window.onload;
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      jtab.renderimplicit();
    }
  }
}


// bootstrap jtab
jtab.init();

