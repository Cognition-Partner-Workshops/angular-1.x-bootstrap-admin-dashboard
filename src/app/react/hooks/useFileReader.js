/**
 * useFileReader — React hook equivalent of the AngularJS fileReader service.
 *
 * Returns { readAsDataUrl, progress } where:
 *   readAsDataUrl(file) — returns a Promise<string> of the file's data URL
 *   progress            — { loaded, total } tracking read progress
 *
 * Usage:
 *   var { readAsDataUrl, progress } = useFileReader();
 *   var dataUrl = await readAsDataUrl(selectedFile);
 */
import { useState, useCallback } from 'react';

export function useFileReader() {
  var [progress, setProgress] = useState({ loaded: 0, total: 0 });

  var readAsDataUrl = useCallback(function (file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();

      reader.onload = function () {
        resolve(reader.result);
      };

      reader.onerror = function () {
        reject(reader.error);
      };

      reader.onprogress = function (event) {
        setProgress({ loaded: event.loaded, total: event.total });
      };

      reader.readAsDataURL(file);
    });
  }, []);

  return { readAsDataUrl: readAsDataUrl, progress: progress };
}
