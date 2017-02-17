import Trie from '../../complete-me/scripts/trie'
import { assert }  from 'chai'
const fs = require('fs')

describe('spec harness', () => {
  var complete

  beforeEach(() => {
    complete = new Trie
  });

  it('should have a count of 0', () => {
    assert.equal(complete.count, 0)
  });

  it('should allow me to insert a word', () => {
    complete.insert('suh')
    assert.equal(complete.count, 1)
  });

  it('should have a populate function that lets me add multiple words', () => {
    complete.populate('pizza\ndog\ncat'.split('\n'))
    assert.equal(complete.count, 3)
  });

  it('should allow me to populate an array of words', () => {
    complete.populate(["shaka", "aardvark", "zombies", "a", "xylophones"])

    assert.equal(complete.count, 5)
    assert.deepEqual(["shaka"], complete.suggest("s"))
    assert.deepEqual(["shaka"], complete.suggest("sh"))
    assert.deepEqual(["zombies"], complete.suggest("zo"))
    assert.deepEqual(["a", "aardvark"], complete.suggest("a").sort())
    assert.deepEqual(["aardvark"], complete.suggest("aa"))
  });


  it('should read in a small data set', () => {
    let text = fs.readFileSync('./spec-harness/medium.txt','utf-8').trim().split('\n')

    complete.populate(text);

    assert.equal(text.length, complete.count)
  });

  it('should suggest the correct words', () => {
    let text = fs.readFileSync('./spec-harness/medium.txt','utf-8').trim().split('\n')
    complete.populate(text);

    assert.deepEqual(["williwaw", "wizardly"], complete.suggest('wi').sort())

    complete.select('wizardly')

    assert.deepEqual(["wizardly", "williwaw"], complete.suggest('wi'))
  });

  it('should load in a large data set', ()=> {
    let text = fs.readFileSync('/usr/share/dict/words', 'utf-8')
                 .trim().split('\n')
    complete.populate(text);

    assert.deepEqual(["doggerel", "doggereler", "doggerelism", "doggerelist",
                 "doggerelize", "doggerelizer"], complete.suggest("doggerel"))

    complete.select( 'doggerelist')
    assert.deepEqual('doggerelist', complete.suggest('doggerel')[0])

  });
})
