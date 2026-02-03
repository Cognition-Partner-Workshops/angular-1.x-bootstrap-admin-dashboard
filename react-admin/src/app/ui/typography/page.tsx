"use client";

import React from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";

export default function TypographyPage() {
  return (
    <div>
      <ContentTop title="Typography" />

      <div className="space-y-6">
        <Panel title="Headings">
          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <h1 className="text-4xl font-bold text-gray-800">h1. Heading</h1>
              <span className="text-sm text-gray-500">36px / Bold</span>
            </div>
            <div className="flex items-baseline gap-4">
              <h2 className="text-3xl font-bold text-gray-800">h2. Heading</h2>
              <span className="text-sm text-gray-500">30px / Bold</span>
            </div>
            <div className="flex items-baseline gap-4">
              <h3 className="text-2xl font-semibold text-gray-800">h3. Heading</h3>
              <span className="text-sm text-gray-500">24px / Semibold</span>
            </div>
            <div className="flex items-baseline gap-4">
              <h4 className="text-xl font-semibold text-gray-800">h4. Heading</h4>
              <span className="text-sm text-gray-500">20px / Semibold</span>
            </div>
            <div className="flex items-baseline gap-4">
              <h5 className="text-lg font-medium text-gray-800">h5. Heading</h5>
              <span className="text-sm text-gray-500">18px / Medium</span>
            </div>
            <div className="flex items-baseline gap-4">
              <h6 className="text-base font-medium text-gray-800">h6. Heading</h6>
              <span className="text-sm text-gray-500">16px / Medium</span>
            </div>
          </div>
        </Panel>

        <Panel title="Body Text">
          <div className="space-y-4">
            <p className="text-base text-gray-700 leading-relaxed">
              This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, and{" "}
              <u>underlined text</u>. You can also use <code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono">inline code</code> within paragraphs.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              This is smaller body text (14px). Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              This is extra small text (12px). Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </Panel>

        <Panel title="Lead Paragraph">
          <p className="text-xl text-gray-600 leading-relaxed font-light">
            This is a lead paragraph. It stands out from regular paragraphs with larger text and lighter weight. Use it for introductions or important content that needs emphasis.
          </p>
        </Panel>

        <Panel title="Text Colors">
          <div className="space-y-2">
            <p className="text-[#209e91]">This is primary colored text.</p>
            <p className="text-[#2dacd1]">This is info colored text.</p>
            <p className="text-[#90b900]">This is success colored text.</p>
            <p className="text-[#dfb81c]">This is warning colored text.</p>
            <p className="text-[#e85656]">This is danger colored text.</p>
            <p className="text-gray-500">This is muted text.</p>
          </div>
        </Panel>

        <Panel title="Blockquotes">
          <div className="space-y-6">
            <blockquote className="border-l-4 border-[#209e91] pl-4 py-2 italic text-gray-600">
              <p className="mb-2">
                &ldquo;The only way to do great work is to love what you do. If you have not found it yet, keep looking. Do not settle.&rdquo;
              </p>
              <footer className="text-sm text-gray-500">— Steve Jobs</footer>
            </blockquote>

            <blockquote className="border-l-4 border-gray-300 pl-4 py-2 text-gray-600">
              <p>
                A simple blockquote without attribution. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </blockquote>
          </div>
        </Panel>

        <Panel title="Lists">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Unordered List</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa
                  <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                    <li>Nested item one</li>
                    <li>Nested item two</li>
                  </ul>
                </li>
                <li>Facilisis in pretium nisl aliquet</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Ordered List</h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Integer molestie lorem at massa</li>
                <li>Facilisis in pretium nisl aliquet</li>
                <li>Nulla volutpat aliquam velit</li>
              </ol>
            </div>
          </div>
        </Panel>

        <Panel title="Description List">
          <dl className="space-y-4">
            <div>
              <dt className="font-medium text-gray-800">Description lists</dt>
              <dd className="text-gray-600 ml-4">A description list is perfect for defining terms.</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-800">Euismod</dt>
              <dd className="text-gray-600 ml-4">Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-800">Malesuada porta</dt>
              <dd className="text-gray-600 ml-4">Etiam porta sem malesuada magna mollis euismod.</dd>
            </div>
          </dl>
        </Panel>

        <Panel title="Code">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Inline Code</h4>
              <p className="text-gray-700">
                For example, <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono text-[#e85656]">&lt;section&gt;</code> should be wrapped as inline.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Code Block</h4>
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono">
{`function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');`}
              </pre>
            </div>
          </div>
        </Panel>

        <Panel title="Text Alignment">
          <div className="space-y-4">
            <p className="text-left text-gray-700">Left aligned text. Lorem ipsum dolor sit amet.</p>
            <p className="text-center text-gray-700">Center aligned text. Lorem ipsum dolor sit amet.</p>
            <p className="text-right text-gray-700">Right aligned text. Lorem ipsum dolor sit amet.</p>
            <p className="text-justify text-gray-700">
              Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </Panel>

        <Panel title="Text Transformation">
          <div className="space-y-2">
            <p className="lowercase text-gray-700">Lowercased text. THIS TEXT WILL BE LOWERCASE.</p>
            <p className="uppercase text-gray-700">Uppercased text. this text will be uppercase.</p>
            <p className="capitalize text-gray-700">capitalized text. each word will be capitalized.</p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
