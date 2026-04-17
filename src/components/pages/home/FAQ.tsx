"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

import { SectionTitle } from "@/components/shared";
import { faqs } from "@/data/faq";

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-10 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="">
          <p className="hidden lg:block text-foreground-accent">FAQ&apos;S</p>
          <SectionTitle>
            <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">
              Frequently Asked Questions
            </h2>
          </SectionTitle>
          <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">Ask us anything!</p>
          <a
            href="mailto:help@punchcardku.com"
            className="mt-3 block text-xl lg:text-4xl text-secondary font-semibold hover:underline text-center lg:text-left"
          >
            help@punchcardku.com
          </a>
        </div>

        <div className="w-full lg:max-w-2xl mx-auto border-b">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-7">
              <Disclosure>
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex items-center justify-between w-full px-4 pt-7 text-lg text-left border-t">
                      <span className="text-2xl font-semibold">{faq.question}</span>
                      <span className="relative w-5 h-5 text-secondary">
                        <AnimatePresence initial={false} mode="wait">
                          {open ? (
                            <motion.span
                              key="minus"
                              className="absolute inset-0"
                              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                              animate={{ opacity: 1, rotate: 0, scale: 1 }}
                              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                              <BiMinus className="w-5 h-5" />
                            </motion.span>
                          ) : (
                            <motion.span
                              key="plus"
                              className="absolute inset-0"
                              initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                              animate={{ opacity: 1, rotate: 0, scale: 1 }}
                              exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                              <BiPlus className="w-5 h-5" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel static className="overflow-hidden">
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="px-4 pt-4 pb-2 text-foreground-accent overflow-hidden"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

