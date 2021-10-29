import { getRoot } from "./refs/root";
import { isProduction } from "./environment";
import { HTTP } from "./http";

/**
  * 
	* @author Darko Petrovic
  * @Link Facebook: https://www.facebook.com/WitchkingOfAngmarr
  * @Link GitHub: https://github.com/darkoxv88
  * 
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.


exports:

  window.HttpClient;

backup:

  window.___webpack_export_dp_HttpClient___.definition

**/

var libName = 'HttpClient';

try
{
  if (getRoot()[libName] && isProduction()) {
    throw new Error('window["' + libName + '"] is already in use! Switching to: ' + 'window["___webpack_export_' + libName + '___"].definition');
  }

  getRoot()[libName] = HTTP;
}
catch(err)
{
  console.error(err);

	if (typeof(getRoot()['___webpack_export_dp_' + libName + '___']) !== 'object' || !(getRoot()['___webpack_export_dp_' + libName + '___'])) {
		getRoot()['___webpack_export_dp_' + libName + '___'] = ({ });
	}

	getRoot()['___webpack_export_dp_' + libName + '___'].definition = HTTP;
}
